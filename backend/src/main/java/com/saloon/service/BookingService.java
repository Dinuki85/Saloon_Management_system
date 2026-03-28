package com.saloon.service;

import com.saloon.model.Appointment;
import com.saloon.model.User;
import com.saloon.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByUser(User user) {
        return appointmentRepository.findByUser(user);
    }

    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public void cancelAppointment(Long id, String userEmail) {
        Appointment appointment = getAppointmentById(id);
        if (!appointment.getUser().getEmail().equals(userEmail)) {
            throw new RuntimeException("Unauthorized: You can only cancel your own appointments");
        }
        appointment.setStatus(com.saloon.model.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public boolean hasStylistConflict(Long staffId, java.time.LocalDate date, String timeSlot) {
        return appointmentRepository.existsByStaffIdAndDateAndTimeSlotAndStatusNotIn(
                staffId, date, timeSlot, java.util.Arrays.asList(
                        com.saloon.model.AppointmentStatus.CANCELLED, 
                        com.saloon.model.AppointmentStatus.PAYMENT_FAILED));
    }

    public boolean hasUserConflict(Long userId, java.time.LocalDate date, String timeSlot) {
        return appointmentRepository.existsByUserIdAndDateAndTimeSlotAndStatusNotIn(
                userId, date, timeSlot, java.util.Arrays.asList(
                        com.saloon.model.AppointmentStatus.CANCELLED, 
                        com.saloon.model.AppointmentStatus.PAYMENT_FAILED));
    }
}
