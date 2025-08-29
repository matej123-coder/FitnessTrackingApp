package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.enums.Role;
import com.example.fitnesstrackingapp.domain.response.UserResponse;
import com.example.fitnesstrackingapp.exceptions.UserNotFoundException;
import com.example.fitnesstrackingapp.mapper.UserMapper;
import com.example.fitnesstrackingapp.repository.*;
import com.example.fitnesstrackingapp.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    private final DailyTrackingRepository dailyTrackingRepository;
    private final GoalRepository goalRepository;
    private final WeightWorkoutRepository weightWorkoutRepository;
    private final MealRepository mealRepository;
    private final UserMapper userMapper;
    private final ExerciseRepository exerciseRepository;
    private final RuntimeWorkoutRepository runtimeWorkoutRepository;

    public UserServiceImpl(UserRepository userRepository, WorkoutSessionRepository workoutSessionRepository, DailyTrackingRepository dailyTrackingRepository, GoalRepository goalRepository, WeightWorkoutRepository weightWorkoutRepository, MealRepository mealRepository, UserMapper userMapper, ExerciseRepository exerciseRepository, RuntimeWorkoutRepository runtimeWorkoutRepository) {
        this.userRepository = userRepository;
        this.workoutSessionRepository = workoutSessionRepository;
        this.dailyTrackingRepository = dailyTrackingRepository;
        this.goalRepository = goalRepository;
        this.weightWorkoutRepository = weightWorkoutRepository;
        this.mealRepository = mealRepository;
        this.userMapper = userMapper;
        this.exerciseRepository = exerciseRepository;
        this.runtimeWorkoutRepository = runtimeWorkoutRepository;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(userMapper::toDto).toList();
    }

    @Override
    public UserResponse getUser(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        return userMapper.toDto(user);
    }

    @Override
    public void delete(Long id) {
        List<Long> allWorkoutIds = workoutSessionRepository.findAllIds(id);
        exerciseRepository.deleteAllByWeight(allWorkoutIds);
        weightWorkoutRepository.deleteAllByWorkout(allWorkoutIds);
        runtimeWorkoutRepository.deleteAllByWorkout(allWorkoutIds);
        workoutSessionRepository.deleteAllByUserId(id);
        mealRepository.deleteAllByUserId(id);
        goalRepository.deleteAllByUserId(id);
        dailyTrackingRepository.deleteAllByUserId(id);
        userRepository.deleteById(id);
    }

    @Override
    public void makeAdmin(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        if (user.getRole().equals(Role.USER)) {
            user.setRole(Role.ADMIN);
        } else {
            user.setRole(Role.USER);
        }
        userRepository.save(user);

    }
}
