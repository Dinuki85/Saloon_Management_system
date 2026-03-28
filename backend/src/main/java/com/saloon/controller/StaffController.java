package com.saloon.controller;

import com.saloon.model.Staff;
import com.saloon.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffRepository staffRepository;

    @GetMapping
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Staff createStaff(@RequestBody Staff staff) {
        return staffRepository.save(staff);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody Staff staffDetails) {
        Staff staff = staffRepository.findById(id).orElse(null);
        if (staff == null) {
            return ResponseEntity.notFound().build();
        }

        staff.setName(staffDetails.getName());
        staff.setSpecialization(staffDetails.getSpecialization());
        staff.setAvailability(staffDetails.getAvailability());

        Staff updatedStaff = staffRepository.save(staff);
        return ResponseEntity.ok(updatedStaff);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        Staff staff = staffRepository.findById(id).orElse(null);
        if (staff == null) {
            return ResponseEntity.notFound().build();
        }

        staffRepository.delete(staff);
        return ResponseEntity.ok().build();
    }
}
