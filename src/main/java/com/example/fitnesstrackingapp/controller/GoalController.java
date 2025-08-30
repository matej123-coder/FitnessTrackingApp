package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.GoalDto;
import com.example.fitnesstrackingapp.domain.response.GoalResponse;
import com.example.fitnesstrackingapp.domain.response.GoalResponsePage;
import com.example.fitnesstrackingapp.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/goals")
@CrossOrigin
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponse> getGoalById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(goalService.getById(id));
    }
    @GetMapping
    public ResponseEntity<GoalResponsePage> getGoals(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false, defaultValue = "1", value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "10", value = "pageSize") int pageSize,
            @RequestParam(required = false) String searchParam
    ) {
        Long userId = user.getId();
        return ResponseEntity.status(HttpStatus.OK).body(goalService.getAllByUserId(userId, pageNo, pageSize,searchParam));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGoal(@RequestBody @Valid GoalDto goalDto,
                                        @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        this.goalService.createMeal(goalDto, userId);
        return ResponseEntity.status(HttpStatus.OK).body("Goal has been created successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> createGoal(@RequestBody @Valid GoalDto goalDto, @PathVariable Long id) {
        this.goalService.updateMeal(goalDto, id);
        return ResponseEntity.status(HttpStatus.OK).body("Goal has been updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable Long id) {
        this.goalService.deleteMeal(id);
        return ResponseEntity.status(HttpStatus.OK).body("Goal has been deleted successfully");
    }
}

