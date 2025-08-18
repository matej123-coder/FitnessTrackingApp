package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.WorkoutSession;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession,Long> {
    @Query(value = "SELECT * FROM workout_sessions w " +
            "WHERE w.user_id=:userId AND((:period = 'daily' AND w.created_at::date = CURRENT_DATE) " +
            "OR (:period = 'weekly' AND DATE_TRUNC('week', w.created_at) = DATE_TRUNC('week', CURRENT_DATE)) " +
            "OR (:period = 'monthly' AND DATE_TRUNC('month', w.created_at) = DATE_TRUNC('month', CURRENT_DATE)) " +
            "OR (:period='all') " +
            ")",
            nativeQuery = true)
   List<WorkoutSession> findAllWorkoutSessionPeriod(@Param("period") String period,@Param("userId") Long userId);
    List<WorkoutSession> findAllByUserIdOrderByCreatedAtAsc(Long userId);
}
