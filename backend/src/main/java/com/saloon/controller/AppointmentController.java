package com.saloon.controller;

import com.saloon.dto.AppointmentRequest;
import com.saloon.model.*;
import com.saloon.repository.*;
import com.saloon.util.TimeSlotUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(@RequestParam String date, @RequestParam Long staffId) {
        List<String> allSlots = TimeSlotUtils.generateTimeSlots();
        List<String> bookedSlots = appointmentRepository.findAll().stream()
                .filter(a -> a.getDate().equals(date) && a.getStaff().getId().equals(staffId) && a.getStatus() != AppointmentStatus.CANCELLED)
                .map(Appointment::getTimeSlot)
                .collect(Collectors.toList());

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request) {
        // Double booking prevention
        boolean isAlreadyBooked = appointmentRepository.findAll().stream()
                .anyMatch(a -> a.getDate().equals(request.getDate()) 
                            && a.getStaff().getId().equals(request.getStaffId()) 
                            && a.getTimeSlot().equals(request.getTimeSlot())
                            && a.getStatus() != AppointmentStatus.CANCELLED);
        
        if (isAlreadyBooked) {
            return ResponseEntity.badRequest().body("This time slot is already booked for the selected stylist.");
        }

        // User conflict prevention
        boolean hasUserConflict = appointmentRepository.findAll().stream()
                .anyMatch(a -> a.getDate().equals(request.getDate()) 
                            && a.getUser().getId().equals(request.getUserId()) 
                            && a.getTimeSlot().equals(request.getTimeSlot())
                            && a.getStatus() != AppointmentStatus.CANCELLED);

        if (hasUserConflict) {
            return ResponseEntity.badRequest().body("You already have an appointment at this time.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Service service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new RuntimeException("Staff not found"));

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setService(service);
        appointment.setStaff(staff);
        appointment.setDate(request.getDate());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setStatus(AppointmentStatus.PAYMENT_PENDING);

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return appointmentRepository.findByUser(user);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
        
        return ResponseEntity.ok().build();
    }
}
