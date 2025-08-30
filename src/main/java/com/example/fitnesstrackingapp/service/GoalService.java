package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.dto.GoalDto;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.GoalResponse;
import com.example.fitnesstrackingapp.domain.response.GoalResponsePage;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;

public interface GoalService {
    GoalResponse getById(Long id);
    GoalResponsePage getAllByUserId(Long userId, int pageNo, int pageSize,String searchParam);
    void createMeal(GoalDto goalDto, Long userId);
    void updateMeal(GoalDto goalDto,Long id);
    void deleteMeal(Long id );
}
