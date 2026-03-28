package com.saloon.service;

import com.saloon.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<com.saloon.model.Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public com.saloon.model.Service createService(com.saloon.model.Service service) {
        return serviceRepository.save(service);
    }

    public com.saloon.model.Service getServiceById(Long id) {
        return serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service not found with id: " + id));
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}
