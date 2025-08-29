package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.Exercise;
import com.example.fitnesstrackingapp.domain.RuntimeWorkout;
import com.example.fitnesstrackingapp.domain.WeightWorkout;
import com.example.fitnesstrackingapp.domain.WorkoutSession;
import com.example.fitnesstrackingapp.domain.dto.ExerciseDto;
import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import com.example.fitnesstrackingapp.domain.enums.WorkoutType;
import com.example.fitnesstrackingapp.domain.response.ExerciseResponse;
import com.example.fitnesstrackingapp.domain.response.WorkoutSessionResponse;
import com.example.fitnesstrackingapp.repository.WeightWorkoutRepository;
import com.example.fitnesstrackingapp.repository.WorkoutSessionRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class WorkoutSessionMapper {
    private final WeightWorkoutRepository weightWorkoutRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    public WorkoutSessionMapper(WeightWorkoutRepository weightWorkoutRepository, WorkoutSessionRepository workoutSessionRepository) {
        this.weightWorkoutRepository = weightWorkoutRepository;
        this.workoutSessionRepository = workoutSessionRepository;
    }

    public WorkoutSession dtoToModel(WorkoutSessionDto dto, Long userId) {
        WorkoutSession session = new WorkoutSession();
        session.setName(dto.getName());
        session.setDescription(dto.getDescription());
        session.setUserId(userId);
        session.setBurnedCalories(dto.getBurnedCalories());
        session.setCreatedAt(LocalDate.now());
        session.setDuration(dto.getDuration());
        session.setWorkoutType(WorkoutType.valueOf(dto.getWorkoutType()));

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
        session.setWorkoutType(WorkoutType.valueOf(dto.getWorkoutType()));

        // Handle runtime workouts
        if (session.getWorkoutType() == WorkoutType.RUNTIME) {
            // Remove weight workout if present
            if (session.getWeightWorkout() != null) {
                weightWorkoutRepository.deleteById(session.getId());
            }

            RuntimeWorkout runtimeWorkout = session.getRuntimeWorkout();
            if (runtimeWorkout == null) {
                runtimeWorkout = new RuntimeWorkout();
            }
            runtimeWorkout.setPace(dto.getPace());
            runtimeWorkout.setDistance(dto.getDistance());
            runtimeWorkout.setWorkoutSession(session); // set back-reference
            session.setRuntimeWorkout(runtimeWorkout);
        }

        // Handle weight workouts
        else if (session.getWorkoutType() == WorkoutType.WEIGHT) {
            // Remove runtime workout if present
            if (session.getRuntimeWorkout() != null) {
                session.getRuntimeWorkout().setWorkoutSession(null); // break FK reference
                session.setRuntimeWorkout(null);
            }

            WeightWorkout weightWorkout = session.getWeightWorkout();
            if (weightWorkout == null) {
                weightWorkout = new WeightWorkout();
            }
            weightWorkout.setWorkoutSession(session); // set back-reference
            session.setWeightWorkout(weightWorkout);

            // Reset exercises
            weightWorkout.getExercises().clear();
            for (ExerciseDto e : dto.getExercises()) {
                Exercise ex = new Exercise();
                ex.setExerciseName(e.getExerciseName());
                ex.setWeight(e.getWeight());
                ex.setNumberOfSets(e.getNumberOfSets());
                ex.setNumberOfReps(e.getNumberOfReps());
                ex.setWeightWorkout(weightWorkout); // set back-reference
                weightWorkout.getExercises().add(ex);
            }
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
