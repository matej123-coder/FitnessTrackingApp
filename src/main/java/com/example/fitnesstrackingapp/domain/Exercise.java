package com.example.fitnesstrackingapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "exercises")
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "exercise_name")
    private String exerciseName;
    @Column(name = "weight")
    private Double weight;
    @Column(name = "number_of_sets")
    private Integer numberOfSets;
    @Column(name = "number_of_reps")
    private Integer numberOfReps;
    @ManyToOne
    @JoinColumn(name = "weight_workout_id")
    private WeightWorkout weightWorkout;
}
