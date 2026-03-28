package com.saloon.controller;

import com.saloon.model.Appointment;
import com.saloon.model.AppointmentStatus;
import com.saloon.model.Service;
import com.saloon.model.Staff;
import com.saloon.repository.AppointmentRepository;
import com.saloon.repository.ServiceRepository;
import com.saloon.repository.StaffRepository;
import com.saloon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;
    
    // Appointment Management (Paginated)
    @GetMapping("/appointments")
    public Page<Appointment> getAllAppointments(Pageable pageable) {
        return appointmentRepository.findAll(pageable);
    }

    @PutMapping("/appointments/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable Long id, @RequestParam AppointmentStatus status) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        appointment.setStatus(status);
        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        List<Appointment> allAppointments = appointmentRepository.findAll();
        
        stats.put("totalBookings", allAppointments.size());
        stats.put("totalCustomers", userRepository.count());
        
        double revenue = allAppointments.stream()
                .filter(a -> a.getStatus() == AppointmentStatus.COMPLETED)
                .mapToDouble(a -> a.getService().getPrice())
                .sum();
        stats.put("totalRevenue", revenue);
        
        // Trend data (Last 7 days)
        Map<String, Long> bookingsTrend = allAppointments.stream()
                .collect(Collectors.groupingBy(a -> a.getDate().toString(), Collectors.counting()));
        stats.put("bookingsTrend", bookingsTrend);

        Map<String, Double> revenueTrend = allAppointments.stream()
                .filter(a -> a.getStatus() == AppointmentStatus.COMPLETED)
                .collect(Collectors.groupingBy(a -> a.getDate().toString(), 
                        Collectors.summingDouble(a -> a.getService().getPrice())));
        stats.put("revenueTrend", revenueTrend);

        return stats;
    }

    // Service Management
    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping("/services")
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }
    
    // Staff Management
    @GetMapping("/staff")
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @PostMapping("/staff")
    public Staff createStaff(@RequestBody Staff staff) {
        return staffRepository.save(staff);
    }
}
