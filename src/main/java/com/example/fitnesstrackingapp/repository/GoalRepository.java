package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.Goal;
import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    @Query(value = """
    SELECT * FROM goals g
    WHERE g.user_id = :userId
      AND (:goalType IS NULL OR g.goal_type::text = :goalType)
      AND (:status IS NULL OR g.status::text = :status)
      AND (
            (:period = 'daily' AND DATE(g.start_date) = CURRENT_DATE AND DATE(g.end_date) = CURRENT_DATE)
         OR (:period = 'weekly' AND DATE_TRUNC('week', g.start_date) = DATE_TRUNC('week', CURRENT_DATE)
                               AND DATE_TRUNC('week', g.end_date) = DATE_TRUNC('week', CURRENT_DATE))
         OR (:period = 'monthly' AND DATE_TRUNC('month', g.start_date) = DATE_TRUNC('month', CURRENT_DATE)
                                 AND DATE_TRUNC('month', g.end_date) = DATE_TRUNC('month', CURRENT_DATE))
         OR (:period = 'all')
      )
    """, nativeQuery = true)
    List<Goal> findGoalsFiltered(
            @Param("userId") Long userId,
            @Param("period") String period,
            @Param("status") String status,
            @Param("goalType") String goalType
    );
    Page<Goal> findAllByUserId(Long userId, Pageable page);
}
