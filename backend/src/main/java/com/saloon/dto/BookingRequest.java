package com.saloon.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class BookingRequest {
    private Long userId;
    private Long serviceId;
    private Long staffId;
    private LocalDate date;
    private String timeSlot;
}
