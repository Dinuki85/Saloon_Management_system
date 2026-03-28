package com.saloon.service;

import com.saloon.model.Service;
import com.saloon.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@org.springframework.stereotype.Service
public class TreatmentService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
