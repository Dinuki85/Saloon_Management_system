package com.saloon.config;

import com.saloon.model.Role;
import com.saloon.model.User;
import com.saloon.repository.RoleRepository;
import com.saloon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize Roles
        ensureRole("ROLE_USER");
        ensureRole("ROLE_ADMIN");

        // Initialize Admin User
        User admin = userRepository.findByEmail("admin@luxesaloon.com").orElse(new User());
        if (admin.getId() == null) {
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@luxesaloon.com");
        }
        admin.setPassword(passwordEncoder.encode("admin123"));
        
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName("ROLE_ADMIN").get());
        admin.setRoles(roles);
        
        userRepository.save(admin);
        System.out.println("Admin User synchronized: admin@luxesaloon.com / admin123");
    }

    private void ensureRole(String name) {
        if (!roleRepository.findByName(name).isPresent()) {
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
    }
}
