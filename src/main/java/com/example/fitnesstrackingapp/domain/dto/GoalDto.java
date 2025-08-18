package com.example.fitnesstrackingapp.domain.dto;

import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoalDto {
    @NotBlank(message = "Title must not be blank")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Description must not be blank")
    @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters")
    private String description;

    @NotNull(message = "Target value must not be null")
    @Positive(message = "Target value must be positive")
    private Double targetValue;

    @NotNull(message = "Goal type is required")
    @Pattern(
            regexp = "Distance|Steps|Burned Calories|Calories Intake",
            message = "Goal must be one of:Distance, Weight, Steps, Calories"
    )
    private String goal;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be today or in the future")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    @FutureOrPresent(message = "End date must be today or in the future")
    private LocalDate endDate;

    @NotNull(message = "Goal status is required")
    @Pattern(
            regexp = "In Progress|Completed|Failed",
            message = "Goal status must be one of:In Progress, Completed, Failed"
    )
    private String goalStatus;
}
