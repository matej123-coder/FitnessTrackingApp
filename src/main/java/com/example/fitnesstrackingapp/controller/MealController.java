package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;
import com.example.fitnesstrackingapp.service.MealService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/meals")
@CrossOrigin
public class MealController {
    private final MealService mealService;

    public MealController(MealService mealService) {

        this.mealService = mealService;
    }

    @GetMapping
    public ResponseEntity<MealResponsePage> getAllByUserId(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false, defaultValue = "1", value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "10", value = "pageSize") int pageSize
    ) {
        Long userId = user.getId();
        return ResponseEntity.status(HttpStatus.OK).body(this.mealService.getAllByUserId(userId,pageNo,pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealResponse> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.mealService.getById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMeal(@Valid @RequestBody MealDto mealDto, @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        this.mealService.createMeal(mealDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Meal has been created successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateMeal(
            @Valid @RequestBody MealDto mealDto,
            @PathVariable Long id) {
        this.mealService.updateMeal(mealDto, id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Meal has been updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable Long id) {
        this.mealService.deleteMeal(id);
        return ResponseEntity.status(HttpStatus.OK).body("Meal has been deleted successfully");
    }
}

