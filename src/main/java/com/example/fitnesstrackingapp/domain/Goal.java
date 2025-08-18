package com.example.fitnesstrackingapp.domain;

import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "target_value")
    private Double targetValue;
    @Column(name = "goal_type")
    @Enumerated(value = EnumType.STRING)
    private GoalType goal;
    @Column(name = "start_date")
    private LocalDate startDate;
    @Column(name = "end_date")
    private LocalDate endDate;
    @Column(name = "status")
    @Enumerated(value = EnumType.STRING)
    private Status goalStatus;
    @Column(name="user_id")
    private Long userId;
}
