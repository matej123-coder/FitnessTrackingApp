package com.example.fitnesstrackingapp.domain;

import com.example.fitnesstrackingapp.domain.enums.WorkoutType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "workout_sessions")
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name="description")
    private String description;
    @Column(name = "user_id")
    private Long userId;
    @Column(name="burned_calories")
    private Integer burnedCalories;
    @Column(name="created_at")
    private LocalDate createdAt;
    @Column(name="duration")
    private Duration duration;
    @Column(name="workout_type")
    @Enumerated(value=EnumType.STRING)
    private WorkoutType workoutType;
    @OneToOne(mappedBy = "workoutSession",orphanRemoval = true,cascade = CascadeType.ALL)
    private WeightWorkout weightWorkout;
    @OneToOne(mappedBy = "workoutSession",orphanRemoval = true,cascade = CascadeType.ALL)
    private RuntimeWorkout runtimeWorkout;

}
