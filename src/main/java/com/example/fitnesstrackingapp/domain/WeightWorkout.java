package com.example.fitnesstrackingapp.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "weight_workouts")
@Data
@NoArgsConstructor
public class WeightWorkout {
    @Id
    private Long id;
    @OneToOne
    @JoinColumn(name = "id")
    @MapsId
    private WorkoutSession workoutSession;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "weightWorkout")
    List<Exercise> exercises = new ArrayList<>();

}
