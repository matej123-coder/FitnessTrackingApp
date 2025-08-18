package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.Meal;
import com.example.fitnesstrackingapp.domain.dto.MealDto;
import com.example.fitnesstrackingapp.domain.response.MealResponse;
import com.example.fitnesstrackingapp.domain.response.MealResponsePage;
import com.example.fitnesstrackingapp.exceptions.MealNotFoundException;
import com.example.fitnesstrackingapp.mapper.MealMapper;
import com.example.fitnesstrackingapp.repository.MealRepository;
import com.example.fitnesstrackingapp.service.MealService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealServiceImpl implements MealService {
    private final MealRepository mealRepository;
    private final MealMapper mealMapper;

    public MealServiceImpl(MealRepository mealRepository, MealMapper mealMapper) {
        this.mealRepository = mealRepository;
        this.mealMapper = mealMapper;
    }

    @Override
    public MealResponse getById(Long id) {
        Meal meal = mealRepository
                .findById(id)
                .orElseThrow(() -> new MealNotFoundException("Meal not found"));
        return mealMapper.modelToResponse(meal);
    }

    @Override
    public MealResponsePage getAllByUserId(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.ASC, "name"));
        Page<Meal> meals = this.mealRepository.findAllByUserId(userId, pageable);
        List<MealResponse> content = meals.getContent().stream().map((mealMapper::modelToResponse)).toList();
        return mealMapper.responseToResponsePage(meals, content);
    }

    @Override
    public void createMeal(MealDto mealDto, Long userId) {
        mealRepository.save(mealMapper.dtoToModel(mealDto,userId));
    }

    @Override
    public void updateMeal(MealDto mealDto, Long id) {
        Meal meal = mealRepository
                .findById(id)
                .orElseThrow(() -> new MealNotFoundException("Meal not found"));
        mealRepository.save(mealMapper.updateDtoToModel(mealDto, meal));
    }

    @Override
    public void deleteMeal(Long id) {
        mealRepository.deleteById(id);
    }
}
