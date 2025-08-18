package com.example.fitnesstrackingapp.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "runtime_workouts")
@Data
@NoArgsConstructor
public class RuntimeWorkout {
    @Id
    private Long id;
    @OneToOne
    @JoinColumn(name = "id")
    @MapsId
    private WorkoutSession workoutSession;
    @Column(name = "pace")
    private Double pace;
    @Column(name = "distance")
    private Double distance;
}
