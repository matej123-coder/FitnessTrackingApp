package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.dto.DailyTrackingDto;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponse;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponsePage;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;

public interface DailyTrackingService {
    DailyTrackingResponse getById(Long id);

    DailyTrackingResponsePage getAllByUserId(Long userId, int pageNo, int pageSize);

    void createMeal(DailyTrackingDto dailyTrackingDto, Long userId);

    void updateMeal(DailyTrackingDto dailyTrackingDto, Long id);

    void deleteMeal(Long id);
}
