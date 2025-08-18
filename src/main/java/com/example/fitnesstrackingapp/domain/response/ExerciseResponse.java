package com.example.fitnesstrackingapp.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseResponse {
    private String exerciseName;
    private Double weight;
    private Integer numberOfSets;
    private Integer numberOfReps;
}