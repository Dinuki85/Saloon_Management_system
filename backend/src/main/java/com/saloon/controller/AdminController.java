package com.saloon.controller;

import com.saloon.model.Service;
import com.saloon.model.Staff;
import com.saloon.repository.ServiceRepository;
import com.saloon.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private StaffRepository staffRepository;
    
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
