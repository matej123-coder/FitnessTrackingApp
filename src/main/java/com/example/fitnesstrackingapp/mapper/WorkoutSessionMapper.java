package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.Exercise;
import com.example.fitnesstrackingapp.domain.RuntimeWorkout;
import com.example.fitnesstrackingapp.domain.WeightWorkout;
import com.example.fitnesstrackingapp.domain.WorkoutSession;
import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import com.example.fitnesstrackingapp.domain.enums.WorkoutType;
import com.example.fitnesstrackingapp.domain.response.ExerciseResponse;
import com.example.fitnesstrackingapp.domain.response.WorkoutSessionResponse;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class WorkoutSessionMapper {
    public WorkoutSession dtoToModel(WorkoutSessionDto dto, Long userId) {
        WorkoutSession session = new WorkoutSession();
        session.setName(dto.getName());
        session.setDescription(dto.getDescription());
        session.setUserId(userId);
        session.setBurnedCalories(dto.getBurnedCalories());
        session.setCreatedAt(LocalDate.now());
        session.setDuration(dto.getDuration());
        session.setWorkoutType(WorkoutType.valueOf(dto.getWorkoutType().toUpperCase()));

        if (session.getWorkoutType() == WorkoutType.RUNTIME) {
            RuntimeWorkout runtimeWorkout = new RuntimeWorkout();
            runtimeWorkout.setPace(dto.getPace());
            runtimeWorkout.setDistance(dto.getDistance());
            runtimeWorkout.setWorkoutSession(session);
            session.setRuntimeWorkout(runtimeWorkout);
        } else if (session.getWorkoutType() == WorkoutType.WEIGHT) {
            WeightWorkout weightWorkout = new WeightWorkout();
            weightWorkout.setWorkoutSession(session);
            List<Exercise> exercises = dto.getExercises().stream().map(e -> {
                Exercise ex = new Exercise();
                ex.setExerciseName(e.getExerciseName());
                ex.setWeight(e.getWeight());
                ex.setNumberOfSets(e.getNumberOfSets());
                ex.setNumberOfReps(e.getNumberOfReps());
                ex.setWeightWorkout(weightWorkout);
                return ex;
            }).toList();
            weightWorkout.setExercises(exercises);
            session.setWeightWorkout(weightWorkout);
        }

        return session;
    }

    public WorkoutSession updateDtoToModel(WorkoutSessionDto dto, WorkoutSession session) {
        session.setName(dto.getName());
        session.setDescription(dto.getDescription());
        session.setBurnedCalories(dto.getBurnedCalories());
        session.setCreatedAt(LocalDate.now());
        session.setDuration(dto.getDuration());
        session.setWorkoutType(WorkoutType.valueOf(dto.getWorkoutType().toUpperCase()));

        if (session.getWorkoutType() == WorkoutType.RUNTIME) {
            RuntimeWorkout runtimeWorkout = new RuntimeWorkout();
            runtimeWorkout.setPace(dto.getPace());
            runtimeWorkout.setDistance(dto.getDistance());
            runtimeWorkout.setWorkoutSession(session);
            session.setRuntimeWorkout(runtimeWorkout);
        } else if (session.getWorkoutType() == WorkoutType.WEIGHT) {
            WeightWorkout weightWorkout = new WeightWorkout();
            weightWorkout.setWorkoutSession(session);
            List<Exercise> exercises = dto.getExercises().stream().map(e -> {
                Exercise ex = new Exercise();
                ex.setExerciseName(e.getExerciseName());
                ex.setWeight(e.getWeight());
                ex.setNumberOfSets(e.getNumberOfSets());
                ex.setNumberOfReps(e.getNumberOfReps());
                ex.setWeightWorkout(weightWorkout);
                return ex;
            }).toList();
            weightWorkout.setExercises(exercises);
            session.setWeightWorkout(weightWorkout);
        }

        return session;
    }

    public WorkoutSessionResponse modelToResponse(WorkoutSession session) {
        WorkoutSessionResponse response = new WorkoutSessionResponse();
        response.setId(session.getId());
        response.setName(session.getName());
        response.setDescription(session.getDescription());
        response.setBurnedCalories(session.getBurnedCalories());
        response.setCreatedAt(session.getCreatedAt());
        response.setDuration(session.getDuration());
        response.setWorkoutType(session.getWorkoutType());
        response.setUserId(session.getUserId());
        if (session.getRuntimeWorkout() != null) {
            response.setPace(session.getRuntimeWorkout().getPace());
            response.setDistance(session.getRuntimeWorkout().getDistance());
        }

        if (session.getWeightWorkout() != null) {
            response.setExercises(
                    session.getWeightWorkout().getExercises().stream().map(e ->
                            new ExerciseResponse(e.getExerciseName(), e.getWeight(), e.getNumberOfSets(), e.getNumberOfReps())
                    ).toList()
            );
        }

        return response;
    }
}
