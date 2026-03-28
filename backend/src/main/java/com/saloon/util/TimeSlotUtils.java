package com.saloon.util;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class TimeSlotUtils {
    
    private static final LocalTime START_TIME = LocalTime.of(9, 0);
    private static final LocalTime END_TIME = LocalTime.of(18, 0);
    private static final int INTERVAL_MINUTES = 30;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("hh:mm a");

    public static List<String> generateTimeSlots() {
        List<String> slots = new ArrayList<>();
        LocalTime currentTime = START_TIME;

        while (currentTime.isBefore(END_TIME)) {
            slots.add(currentTime.format(FORMATTER));
            currentTime = currentTime.plusMinutes(INTERVAL_MINUTES);
        }

        return slots;
    }
}
