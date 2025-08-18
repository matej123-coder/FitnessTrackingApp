package com.example.fitnesstrackingapp.domain.response;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyTrackingResponse {
    private Long id;
    private Double dailySteps;
    private Double dailyWaterIntake;
    private LocalDate createdAt;
    private Long userId;
}
