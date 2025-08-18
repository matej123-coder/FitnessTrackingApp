package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.DailyTracking;
import com.example.fitnesstrackingapp.domain.Goal;
import com.example.fitnesstrackingapp.domain.Meal;
import com.example.fitnesstrackingapp.domain.WorkoutSession;
import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import com.example.fitnesstrackingapp.repository.DailyTrackingRepository;
import com.example.fitnesstrackingapp.repository.GoalRepository;
import com.example.fitnesstrackingapp.repository.MealRepository;
import com.example.fitnesstrackingapp.repository.WorkoutSessionRepository;
import com.example.fitnesstrackingapp.service.DashboardService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardServiceImpl implements DashboardService {
    private final WorkoutSessionRepository workoutSessionRepository;
    private final MealRepository mealRepository;
    private final GoalRepository goalRepository;
    private final DailyTrackingRepository dailyTrackingRepository;

    public DashboardServiceImpl(WorkoutSessionRepository workoutSessionRepository, MealRepository mealRepository, GoalRepository goalRepository, DailyTrackingRepository dailyTrackingRepository) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.mealRepository = mealRepository;
        this.goalRepository = goalRepository;
        this.dailyTrackingRepository = dailyTrackingRepository;
    }

    @Override
    public Map<String, Double> dashboardCounts(String period, Long userId) {
        HashMap<String, Double> counts = new HashMap<>();
        initializeHashMap(counts);
        List<Meal> meals = mealRepository.findAllMealsPeriod(period, userId);
        counts.put("meals", (double) meals.size());
        List<WorkoutSession> workoutSessions = workoutSessionRepository.findAllWorkoutSessionPeriod(period, userId);
        counts.put("workoutSessions", (double) workoutSessions.size());
        List<Goal> goals = goalRepository.findGoalsFiltered(userId, period, null, null);
        counts.put("goals", (double) goals.size());
        long completed = goals.stream().filter(g -> g.getGoalStatus() == Status.COMPLETED).count();
        long inProgress = goals.stream().filter(g -> g.getGoalStatus() == Status.IN_PROGRESS).count();
        long failed = goals.stream().filter(g -> g.getGoalStatus() == Status.FAILED).count();
        counts.put("goalsCompleted", (double) completed);
        counts.put("goalsFailed", (double) failed);
        counts.put("goalsInProgress", (double) inProgress);
        List<DailyTracking> dailyTracking = dailyTrackingRepository.findAllDailyTrackingPeriod(period, userId);
        counts.put("stepsCompleted", sumOfSteps(dailyTracking));
        List<Goal> goalsSteps = goalRepository.findGoalsFiltered(userId,period,Status.IN_PROGRESS.name(), GoalType.STEPS.name());
        counts.put("stepsGoal",sumOfCompleted(goalsSteps));
        counts.put("burnedCalories",sumOfBurnedCalories(workoutSessions));
        List<Goal> goalsBurnedCalories = goalRepository.findGoalsFiltered(userId,period,Status.IN_PROGRESS.name(),GoalType.BURNED_CALORIES.name());
        counts.put("burnedCaloriesGoal",sumOfCompleted(goalsBurnedCalories));
        counts.put("caloriesIntake",sumOfCaloriesIntake(meals));
        List<Goal> goalsCaloriesIntake=goalRepository.findGoalsFiltered(userId,period,Status.IN_PROGRESS.name(),GoalType.CALORIES_INTAKE.name());
        counts.put("caloriesIntakeGoal",sumOfCompleted(goalsCaloriesIntake));
        counts.put("averageDuration",averageDuration(workoutSessions));
        counts.put("waterIntake",sumOfWaterIntake(dailyTracking));
        return counts;
    }

    public void initializeHashMap(HashMap<String, Double> counts) {
        counts.put("stepsCompleted", 0.0);
        counts.put("stepsGoal", 0.0);
        counts.put("burnedCalories", 0.0);
        counts.put("burnedCaloriesGoal", 0.0);
        counts.put("caloriesIntake", 0.0);
        counts.put("caloriesIntakeGoal", 0.0);
        counts.put("waterIntake", 0.0);
        counts.put("goalsCompleted", 0.0);
        counts.put("goalsFailed", 0.0);
        counts.put("goalsInProgress", 0.0);
        counts.put("meals", 0.0);
        counts.put("workoutSessions", 0.0);
        counts.put("goals", 0.0);
        counts.put("averageDuration", 0.0);
    }

    public Double sumOfSteps(List<DailyTracking> dailyTrackings) {
        return dailyTrackings.stream().mapToDouble(DailyTracking::getDailySteps).sum();
    }
    public Double sumOfWaterIntake(List<DailyTracking> dailyTrackings) {
        return dailyTrackings.stream().mapToDouble(DailyTracking::getDailyWaterIntake).sum();
    }

    public Double averageDuration(List<WorkoutSession> workoutSessions){
        return workoutSessions.isEmpty() ? 0.0 :
                workoutSessions.stream()
                        .mapToDouble(ws -> ws.getDuration().toMinutes())
                        .average()
                        .orElse(0.0);
    }
    public Double sumOfCompleted(List<Goal> goalsSteps) {
        return goalsSteps.stream().mapToDouble(Goal::getTargetValue).sum();
    }
    public Double sumOfBurnedCalories(List<WorkoutSession> workoutSessions) {
        return workoutSessions.stream().mapToDouble(WorkoutSession::getBurnedCalories).sum();
    }
    public Double sumOfCaloriesIntake(List<Meal> meals){
        return meals.stream().mapToDouble(Meal::getCaloriesIntake).sum();
    }
}
