package com.saloon.controller;

import com.saloon.model.Service;
import com.saloon.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/services")
public class ServiceController {
    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Service createService(@RequestBody Service service) {
        return serviceRepository.save(service);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateService(@PathVariable Long id, @RequestBody Service serviceDetails) {
        Service service = serviceRepository.findById(id).orElse(null);
        if (service == null) {
            return ResponseEntity.notFound().build();
        }

        service.setName(serviceDetails.getName());
        service.setDescription(serviceDetails.getDescription());
        service.setPrice(serviceDetails.getPrice());
        service.setDuration(serviceDetails.getDuration());

        Service updatedService = serviceRepository.save(service);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        Service service = serviceRepository.findById(id).orElse(null);
        if (service == null) {
            return ResponseEntity.notFound().build();
        }

        serviceRepository.delete(service);
        return ResponseEntity.ok().build();
    }
}
