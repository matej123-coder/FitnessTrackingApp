package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import com.example.fitnesstrackingapp.domain.response.WorkoutSessionResponse;

import java.util.List;

public interface WorkoutSessionService {
    WorkoutSessionResponse getById(Long id);

    List<WorkoutSessionResponse> getAllByUserId(Long userId);

    void createWorkout(WorkoutSessionDto workoutSessionDto, Long userId);

    void updateWorkout(WorkoutSessionDto workoutSessionDto, Long id);

    void deleteWorkout(Long id);
}
