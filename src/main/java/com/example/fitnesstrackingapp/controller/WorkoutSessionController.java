package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import com.example.fitnesstrackingapp.domain.response.WorkoutSessionResponse;
import com.example.fitnesstrackingapp.service.WorkoutSessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workouts")
public class WorkoutSessionController {
    private final WorkoutSessionService workoutSessionService;

    public WorkoutSessionController(WorkoutSessionService workoutSessionService) {
        this.workoutSessionService = workoutSessionService;
    }
    @GetMapping
    public ResponseEntity<List<WorkoutSessionResponse>> getAll(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(workoutSessionService.getAllByUserId(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutSessionResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutSessionService.getById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@Valid @RequestBody WorkoutSessionDto dto,
                                         @AuthenticationPrincipal User user) {
        workoutSessionService.createWorkout(dto, user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Workout created successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> update(@PathVariable Long id,
                                         @Valid @RequestBody WorkoutSessionDto dto) {
        workoutSessionService.updateWorkout(dto, id);
        return ResponseEntity.ok("Workout updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        workoutSessionService.deleteWorkout(id);
        return ResponseEntity.ok("Workout deleted successfully");
    }
}
