package com.saloon;

import com.saloon.model.Role;
import com.saloon.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@org.springframework.cache.annotation.EnableCaching
@SpringBootApplication
public class SaloonApplication {
    public static void main(String[] args) {
        SpringApplication.run(SaloonApplication.class, args);
    }

    @Bean
    CommandLineRunner init(RoleRepository roleRepository, com.saloon.repository.ServiceRepository serviceRepository, com.saloon.repository.StaffRepository staffRepository) {
        return args -> {
            if (roleRepository.findByName("ROLE_USER").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_USER"));
            }
            if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
                roleRepository.save(new Role(null, "ROLE_ADMIN"));
            }

            if (serviceRepository.count() == 0) {
                serviceRepository.save(new com.saloon.model.Service(null, "Luxury Haircut", "Full styling and wash", 50.0, 45, false));
                serviceRepository.save(new com.saloon.model.Service(null, "Spa Treatment", "Full body massage", 120.0, 90, false));
                serviceRepository.save(new com.saloon.model.Service(null, "Manicure", "Nail care and polish", 30.0, 30, false));
            }

            if (staffRepository.count() == 0) {
                staffRepository.save(new com.saloon.model.Staff(null, "John Doe", "Master Stylist", "Mon-Fri", false));
                staffRepository.save(new com.saloon.model.Staff(null, "Jane Smith", "Aroma Therapist", "Tue-Sat", false));
            }
        };
    }
}
