package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.Meal;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MealMapper {
public Meal dtoToModel(MealDto mealDto,Long userId){
    Meal meal =new Meal();
    meal.setMealDate(mealDto.getMealDate());
    meal.setName(mealDto.getName());
    meal.setCaloriesIntake(mealDto.getCaloriesIntake());
    meal.setUserId(userId);
    return meal;
}
    public Meal updateDtoToModel(MealDto mealDto,Meal meal){
        meal.setMealDate(mealDto.getMealDate());
        meal.setName(mealDto.getName());
        meal.setCaloriesIntake(mealDto.getCaloriesIntake());
        return meal;
    }
    public MealResponsePage responseToResponsePage(Page<Meal> meals,List<MealResponse> content){
    MealResponsePage mealResponsePage = new MealResponsePage();
    mealResponsePage.setContent(content);
    mealResponsePage.setPageSize(meals.getSize());
    mealResponsePage.setPageNo(meals.getNumber());
    mealResponsePage.setTotalPages(meals.getTotalPages());
    mealResponsePage.setTotalElements(meals.getTotalElements());
    mealResponsePage.setLast(meals.isLast());
    return mealResponsePage;

    }
    public MealResponse modelToResponse(Meal meal){
        MealResponse mealResponse =new MealResponse();
        mealResponse.setMealDate(meal.getMealDate());
        mealResponse.setName(meal.getName());
        mealResponse.setCaloriesIntake(meal.getCaloriesIntake());
        mealResponse.setUserId(meal.getUserId());
        mealResponse.setId(meal.getId());
        return mealResponse;
    }
}
