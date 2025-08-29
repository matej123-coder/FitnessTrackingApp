package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.Exercise;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM Exercise e where e.weightWorkout.id IN :workoutIds")
    void deleteAllByWeight(@Param("workoutIds")List<Long> workoutIds);
}
