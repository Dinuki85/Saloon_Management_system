package com.saloon.controller;

import com.saloon.dto.AppointmentRequest;
import com.saloon.model.Appointment;
import com.saloon.model.AppointmentStatus;
import com.saloon.model.Service;
import com.saloon.model.Staff;
import com.saloon.model.User;
import com.saloon.repository.AppointmentRepository;
import com.saloon.repository.ServiceRepository;
import com.saloon.repository.StaffRepository;
import com.saloon.repository.UserRepository;
import com.saloon.service.BookingService;
import com.saloon.service.StaffService;
import com.saloon.service.TreatmentService;
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
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.saloon.service.TreatmentService treatmentService;

    @Autowired
    private com.saloon.service.StaffService staffService;

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(@RequestParam String date, @RequestParam Long staffId) {
        List<String> allSlots = TimeSlotUtils.generateTimeSlots();
        List<String> bookedSlots = bookingService.getAllAppointments().stream()
                .filter(a -> a.getDate().toString().equals(date) && a.getStaff().getId().equals(staffId) && a.getStatus() != AppointmentStatus.CANCELLED)
                .map(Appointment::getTimeSlot)
                .collect(Collectors.toList());

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody com.saloon.dto.AppointmentRequest request) {
        if (request.getUserId() == null || request.getServiceId() == null || request.getStaffId() == null) {
            return ResponseEntity.badRequest().body("User ID, Service ID, and Staff ID are required.");
        }

        // Double booking prevention
        boolean isAlreadyBooked = bookingService.getAllAppointments().stream()
                .anyMatch(a -> a.getDate().equals(request.getDate()) 
                            && a.getStaff().getId().equals(request.getStaffId()) 
                            && a.getTimeSlot().equals(request.getTimeSlot())
                            && a.getStatus() != AppointmentStatus.CANCELLED);
        
        if (isAlreadyBooked) {
            return ResponseEntity.badRequest().body("This time slot is already booked for the selected stylist.");
        }

        // User conflict prevention
        boolean hasUserConflict = bookingService.getAllAppointments().stream()
                .anyMatch(a -> a.getDate().equals(request.getDate()) 
                            && a.getUser().getId().equals(request.getUserId()) 
                            && a.getTimeSlot().equals(request.getTimeSlot())
                            && a.getStatus() != AppointmentStatus.CANCELLED);

        if (hasUserConflict) {
            return ResponseEntity.badRequest().body("You already have an appointment at this time.");
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        com.saloon.model.Service service = treatmentService.getServiceById(request.getServiceId());
        Staff staff = staffService.getStaffById(request.getStaffId());

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setService(service);
        appointment.setStaff(staff);
        appointment.setDate(request.getDate());
        appointment.setTimeSlot(request.getTimeSlot());
        appointment.setStatus(AppointmentStatus.PAYMENT_PENDING);

        return ResponseEntity.ok(bookingService.saveAppointment(appointment));
    }

    @GetMapping("/user/{userId}")
    public List<Appointment> getUserAppointments(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return bookingService.getAppointmentsByUser(user);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = bookingService.getAppointmentById(id);
        
        appointment.setStatus(AppointmentStatus.CANCELLED);
        bookingService.saveAppointment(appointment);
        
        return ResponseEntity.ok().build();
    }
}
