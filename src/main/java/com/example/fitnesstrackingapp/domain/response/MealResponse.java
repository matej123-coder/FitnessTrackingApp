package com.example.fitnesstrackingapp.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealResponse {
    private Long id;
    private String name;
    private Integer caloriesIntake;
    private LocalDate mealDate;
    private Long userId;
}
