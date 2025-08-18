package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDto {
    @NotBlank(message = "Exercise name must not be blank")
    private String exerciseName;

    @Positive(message = "Weight must be positive")
    private Double weight;

    @Positive(message = "Number of sets must be positive")
    private Integer numberOfSets;

    @Positive(message = "Number of reps must be positive")
    private Integer numberOfReps;
}
