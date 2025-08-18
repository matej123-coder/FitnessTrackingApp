package com.example.fitnesstrackingapp.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "meals")
@NoArgsConstructor
@AllArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "meal_name")
    private String name;
    @Column(name = "calories_intake")
    private Integer caloriesIntake;
    @Column(name = "meal_date")
    private LocalDate mealDate;
    @Column(name = "user_id")
    private Long userId;
}
