package com.saloon.controller;

import com.saloon.dto.AppointmentRequest;
import com.saloon.model.Appointment;
import com.saloon.model.AppointmentStatus;
import com.saloon.model.Service;
import com.saloon.model.Staff;
import com.saloon.model.User;
import com.saloon.repository.UserRepository;
import com.saloon.service.BookingService;
import com.saloon.service.StaffService;
import com.saloon.service.TreatmentService;
import com.saloon.util.TimeSlotUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    private TreatmentService treatmentService;

    @Autowired
    private StaffService staffService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return bookingService.getAllAppointments();
    }

    @GetMapping("/available-slots")
    public List<String> getAvailableSlots(@RequestParam String date, @RequestParam Long staffId) {
        List<String> allSlots = TimeSlotUtils.generateTimeSlots();
        List<String> bookedSlots = bookingService.getAllAppointments().stream()
                .filter(a -> a.getDate().equals(LocalDate.parse(date)) && a.getStaff().getId().equals(staffId) && a.getStatus() != AppointmentStatus.CANCELLED)
                .map(Appointment::getTimeSlot)
                .collect(Collectors.toList());

        return allSlots.stream()
                .filter(slot -> !bookedSlots.contains(slot))
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@jakarta.validation.Valid @RequestBody AppointmentRequest request) {
        System.out.println("Incoming booking request: " + request);
        try {
            LocalDate bookingDate;
            try {
                bookingDate = LocalDate.parse(request.getDate());
            } catch (Exception e) {
                return ResponseEntity.badRequest().body("Invalid date format. Expected yyyy-MM-dd.");
            }

            // Double booking prevention
            if (bookingService.hasStylistConflict(request.getStaffId(), bookingDate, request.getTimeSlot())) {
                return ResponseEntity.badRequest().body("This time slot is already booked for the selected stylist.");
            }

            // User conflict prevention
            if (bookingService.hasUserConflict(request.getUserId(), bookingDate, request.getTimeSlot())) {
                return ResponseEntity.badRequest().body("You already have an appointment at this time.");
            }

            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.getUserId()));
            Service service = treatmentService.getServiceById(request.getServiceId());
            Staff staff = staffService.getStaffById(request.getStaffId());

            Appointment appointment = new Appointment();
            appointment.setUser(user);
            appointment.setService(service);
            appointment.setStaff(staff);
            appointment.setDate(bookingDate);
            appointment.setTimeSlot(request.getTimeSlot());
            appointment.setStatus(AppointmentStatus.PAYMENT_PENDING);

            return ResponseEntity.ok(bookingService.saveAppointment(appointment));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Booking failed: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserAppointments(@PathVariable Long userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElse(null);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(bookingService.getAppointmentsByUser(user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error fetching appointments: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            AppointmentStatus appointmentStatus;
            try {
                appointmentStatus = AppointmentStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid status: " + status + ". Allowed values: ACCEPTED, REJECTED, COMPLETED, BOOKED, CANCELLED.");
            }

            Appointment appointment = bookingService.getAppointmentById(id);
            appointment.setStatus(appointmentStatus);
            return ResponseEntity.ok(bookingService.saveAppointment(appointment));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to update status: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        Appointment appointment = bookingService.getAppointmentById(id);
        
        appointment.setStatus(AppointmentStatus.CANCELLED);
        bookingService.saveAppointment(appointment);
        
        return ResponseEntity.ok().build();
    }
}
