package com.example.fitnesstrackingapp.domain.response;

import com.example.fitnesstrackingapp.domain.enums.WorkoutType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSessionResponse {
    private Long id;
    private String name;
    private String description;
    private Integer burnedCalories;
    private LocalDate createdAt;
    private Duration duration;
    private WorkoutType workoutType;
    private Double pace;
    private Double distance;
    private List<ExerciseResponse> exercises;
    private Long userId;
}
