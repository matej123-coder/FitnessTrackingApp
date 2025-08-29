package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.WeightWorkout;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WeightWorkoutRepository extends JpaRepository<WeightWorkout,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM WeightWorkout e where e.id IN :workoutIds")
    void deleteAllByWorkout(@Param("workoutIds") List<Long> workoutIds);
}
