package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyTrackingDto {
    @NotNull(message = "Daily steps must not be null")
    @PositiveOrZero(message = "Daily steps must be zero or a positive number")
    private Double dailySteps;

    @NotNull(message = "Daily water intake must not be null")
    @PositiveOrZero(message = "Daily water intake must be zero or a positive number")
    @Max(value = 50, message = "Daily water intake must be less than 50 liters")
    private Double dailyWaterIntake;
}
