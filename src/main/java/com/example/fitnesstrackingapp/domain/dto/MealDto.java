package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MealDto {
    @NotBlank(message = "Meal name must not be blank")
    @Size(min = 2, max = 50, message = "Meal name must be between 2 and 50 characters")
    private String name;
    @NotNull(message = "Meal date must not be null")
    private LocalDate mealDate;
    @NotNull(message = "Calories intake is required")
    @Positive(message = "Calories intake must be a positive number")
    @Max(value = 100000, message = "Calories intake is unrealistically high")
    private Integer caloriesIntake;
}
