package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.Meal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MealRepository extends JpaRepository<Meal, Long> {
    @Query(value = "SELECT * FROM meals m " +
            "WHERE m.user_id=:userId AND((:period = 'daily' AND m.meal_date::date = CURRENT_DATE) " +
            "OR (:period = 'weekly' AND DATE_TRUNC('week', m.meal_date) = DATE_TRUNC('week', CURRENT_DATE)) " +
            "OR (:period = 'monthly' AND DATE_TRUNC('month', m.meal_date) = DATE_TRUNC('month', CURRENT_DATE)) " +
            "OR (:period='all') " +
            ")",
            nativeQuery = true)
    List<Meal> findAllMealsPeriod(@Param("period") String period, @Param("userId") Long userId);

    Page<Meal> findAllByUserId(Long userId, Pageable pageable);
}
