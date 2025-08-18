package com.example.fitnesstrackingapp.domain.response;

import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalResponse {
    private Long id;
    private String title;
    private String description;
    private Double targetValue;
    private GoalType goal;
    private LocalDate startDate;
    private LocalDate endDate;
    private Status goalStatus;
    private Long userId;
}
