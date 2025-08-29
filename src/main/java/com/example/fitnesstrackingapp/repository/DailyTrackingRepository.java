package com.example.fitnesstrackingapp.repository;

import com.example.fitnesstrackingapp.domain.DailyTracking;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DailyTrackingRepository extends JpaRepository<DailyTracking, Long> {
    @Query(value = "SELECT * FROM daily_tracking d " +
            "WHERE d.user_id=:userId AND((:period = 'daily' AND created_at::date = CURRENT_DATE) " +
            "OR (:period = 'weekly' AND DATE_TRUNC('week', created_at) = DATE_TRUNC('week', CURRENT_DATE)) " +
            "OR (:period = 'monthly' AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)) " +
            "OR (:period='all') " +
            ")",
            nativeQuery = true)
    List<DailyTracking> findAllDailyTrackingPeriod(@Param("period") String period, @Param("userId") Long userId);

    Page<DailyTracking> findAllByUserId(Long userId, Pageable pageable);

    @Modifying
    @Transactional
    @Query("DELETE FROM DailyTracking d where d.userId=:userId")
    void deleteAllByUserId(@Param("userId") Long userId);
}
