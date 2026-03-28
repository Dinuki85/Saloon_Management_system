package com.saloon.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AppointmentRequest {
    @NotNull(message = "User ID is required")
    private Long userId;
    @NotNull(message = "Service ID is required")
    private Long serviceId;
    @NotNull(message = "Staff ID is required")
    private Long staffId;
    @NotBlank(message = "Date is required")
    private String date;
    @NotBlank(message = "Time slot is required")
    private String timeSlot;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public Long getStaffId() { return staffId; }
    public void setStaffId(Long staffId) { this.staffId = staffId; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
}
