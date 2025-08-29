package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.RuntimeWorkout;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RuntimeWorkoutRepository extends JpaRepository<RuntimeWorkout,Long> {
    @Modifying
    @Transactional
    @Query("DELETE FROM RuntimeWorkout e where e.id IN :workoutIds")
    void deleteAllByWorkout(@Param("workoutIds") List<Long> workoutIds);
}
