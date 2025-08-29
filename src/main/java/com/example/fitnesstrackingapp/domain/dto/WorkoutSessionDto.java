package com.example.fitnesstrackingapp.domain.dto;

import com.example.fitnesstrackingapp.domain.enums.WorkoutType;
import com.example.fitnesstrackingapp.utils.lib.DeserializeDuration;
import com.example.fitnesstrackingapp.validation.ValidWorkoutSession;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ValidWorkoutSession
public class WorkoutSessionDto {
    @NotBlank(message = "Workout name must not be blank")
    private String name;

    @NotBlank(message = "Workout description must not be blank")
    private String description;

    @NotNull(message = "Burned calories must not be null")
    @Positive(message = "Burned calories must be positive")
    private Integer burnedCalories;

    @NotNull(message = "Duration must not be null")
    @JsonDeserialize(using = DeserializeDuration.class)
    private Duration duration;

    @NotNull(message = "Workout type must not be null")
    @Pattern(
            regexp = "RUNTIME|WEIGHT",
            message = "Workout type must be one of: Runtime, Weight"
    )
    private String workoutType;

    @Positive(message = "Pace must be positive")
    private Double pace;

    @Positive(message = "Distance must be positive")
    private Double distance;

    private List<@Valid ExerciseDto> exercises = new ArrayList<>();
}
