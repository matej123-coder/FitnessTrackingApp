package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.DailyTrackingDto;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponse;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponsePage;
import com.example.fitnesstrackingapp.service.DailyTrackingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dailies")
@CrossOrigin
public class DailyTrackingController {
    private final DailyTrackingService dailyTrackingService;

    public DailyTrackingController(DailyTrackingService dailyTrackingService) {
        this.dailyTrackingService = dailyTrackingService;
    }

    @GetMapping
    public ResponseEntity<DailyTrackingResponsePage> getAllDailiesByUserId(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false, defaultValue = "1", value = "pageNo") int pageNo,
            @RequestParam(required = false, defaultValue = "10", value = "pageSize") int pageSize
    ) {
        Long userId = user.getId();
        return ResponseEntity.status(HttpStatus.OK).body(dailyTrackingService.getAllByUserId(userId, pageNo, pageSize));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DailyTrackingResponse> getById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(dailyTrackingService.getById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDailyTracking(
            @RequestBody @Valid DailyTrackingDto dailyTrackingDto,
            @AuthenticationPrincipal User user) {
        Long userId = user.getId();
        dailyTrackingService.createMeal(dailyTrackingDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Daily tracking has been created successfully");
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDailyTracking(
            @RequestBody @Valid DailyTrackingDto dailyTrackingDto,
            @PathVariable Long id) {
        dailyTrackingService.updateMeal(dailyTrackingDto, id);
        return ResponseEntity.status(HttpStatus.CREATED).body("Daily tracking has been updated successfully");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDailyTracking(@PathVariable Long id) {
        dailyTrackingService.deleteMeal(id);
        return ResponseEntity.status(HttpStatus.OK).body("Daily tracking has been deleted successfully");
    }
}
