package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.Meal;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;

import java.util.List;

public interface MealService {
    MealResponse getById(Long id);
    MealResponsePage getAllByUserId(Long userId,int pageNo,int pageSize,String searchParam);
    void createMeal(MealDto mealDto,Long userId);
    void updateMeal(MealDto mealDto,Long id);
    void deleteMeal(Long id );

}
