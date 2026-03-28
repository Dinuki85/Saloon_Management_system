package com.saloon.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSchemaFixer {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @EventListener(ApplicationReadyEvent.class)
    public void fixSchema() {
        System.out.println("--- 🛡️ RUNNING DATABASE SCHEMA FIXER ---");
        try {
            // Expansion of status column to handle all enum values
            jdbcTemplate.execute("ALTER TABLE appointments MODIFY COLUMN status VARCHAR(50);");
            System.out.println("✅ SUCCESS: appointments.status column expanded to VARCHAR(50)");
            
            // Cleanup any old legacy values if they exist
            jdbcTemplate.execute("UPDATE appointments SET status='BOOKED' WHERE status='PENDING';");
            System.out.println("✅ SUCCESS: Legacy status values updated.");
        } catch (Exception e) {
            System.err.println("⚠️ WARNING: Schema fixer encountered an issue (it might already be fixed): " + e.getMessage());
        }
        System.out.println("--- 🛡️ DATABASE SCHEMA FIXER COMPLETED ---");
    }
}
