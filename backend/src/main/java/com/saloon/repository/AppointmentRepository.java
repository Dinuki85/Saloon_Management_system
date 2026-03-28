package com.saloon.repository;

import com.saloon.model.Appointment;
import com.saloon.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser(User user);
    List<Appointment> findByDate(java.time.LocalDate date);
    List<Appointment> findByDateAfter(java.time.LocalDate date);

    boolean existsByStaffIdAndDateAndTimeSlotAndStatusNotIn(Long staffId, java.time.LocalDate date, String timeSlot, java.util.Collection<com.saloon.model.AppointmentStatus> statuses);
    boolean existsByUserIdAndDateAndTimeSlotAndStatusNotIn(Long userId, java.time.LocalDate date, String timeSlot, java.util.Collection<com.saloon.model.AppointmentStatus> statuses);
}
