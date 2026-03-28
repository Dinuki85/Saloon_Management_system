package com.saloon.controller;

import com.saloon.model.*;
import com.saloon.repository.AppointmentRepository;
import com.saloon.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody Map<String, Object> request) {
        Long appointmentId = Long.valueOf(request.get("appointmentId").toString());
        boolean simulateSuccess = (boolean) request.getOrDefault("simulateSuccess", true);

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Payment payment = new Payment();
        payment.setAppointmentId(appointmentId);
        payment.setAmount(appointment.getService().getPrice());

        if (simulateSuccess) {
            payment.setStatus(PaymentStatus.SUCCESS);
            appointment.setStatus(AppointmentStatus.BOOKED);
        } else {
            payment.setStatus(PaymentStatus.FAILED);
            appointment.setStatus(AppointmentStatus.PAYMENT_FAILED);
        }

        paymentRepository.save(payment);
        appointmentRepository.save(appointment);

        return ResponseEntity.ok(payment);
    }
}
