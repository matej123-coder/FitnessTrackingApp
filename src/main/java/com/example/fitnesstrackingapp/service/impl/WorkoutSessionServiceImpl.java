package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.WorkoutSession;
import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import com.example.fitnesstrackingapp.domain.response.WorkoutSessionResponse;
import com.example.fitnesstrackingapp.exceptions.WorkoutNotFounException;
import com.example.fitnesstrackingapp.mapper.WorkoutSessionMapper;
import com.example.fitnesstrackingapp.repository.WorkoutSessionRepository;
import com.example.fitnesstrackingapp.service.WorkoutSessionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutSessionServiceImpl implements WorkoutSessionService {
    private final WorkoutSessionRepository workoutSessionRepository;
    private final WorkoutSessionMapper workoutSessionMapper;

    public WorkoutSessionServiceImpl(WorkoutSessionRepository workoutSessionRepository, WorkoutSessionMapper workoutSessionMapper) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.workoutSessionMapper = workoutSessionMapper;
    }

    @Override
    public WorkoutSessionResponse getById(Long id) {
        WorkoutSession session = workoutSessionRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFounException("Workout not found"));
        return workoutSessionMapper.modelToResponse(session);
    }

    @Override
    public List<WorkoutSessionResponse> getAllByUserId(Long userId) {
        return workoutSessionRepository.findAllByUserIdOrderByCreatedAtAsc(userId)
                .stream()
                .map(workoutSessionMapper::modelToResponse)
                .toList();
    }

    @Override
    public void createWorkout(WorkoutSessionDto workoutSessionDto, Long userId) {
        workoutSessionRepository.save(workoutSessionMapper.dtoToModel(workoutSessionDto, userId));

    }

    @Override
    public void updateWorkout(WorkoutSessionDto workoutSessionDto, Long id) {
        WorkoutSession session = workoutSessionRepository.findById(id)
                .orElseThrow(() -> new WorkoutNotFounException("Workout not found"));
       WorkoutSession workoutSession= workoutSessionMapper.updateDtoToModel(workoutSessionDto, session);
        workoutSessionRepository.save(workoutSession);
    }

    @Override
    public void deleteWorkout(Long id) {
        workoutSessionRepository.deleteById(id);
    }
}
