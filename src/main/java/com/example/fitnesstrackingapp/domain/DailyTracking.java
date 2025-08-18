package com.example.fitnesstrackingapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "daily_steps")
    private Double dailySteps;
    @Column(name = "daily_water_intake")
    private Double dailyWaterIntake;
    @Column(name = "created_at")
    private LocalDate createdAt;
    @Column(name = "user_id")
    private Long userId;
}
