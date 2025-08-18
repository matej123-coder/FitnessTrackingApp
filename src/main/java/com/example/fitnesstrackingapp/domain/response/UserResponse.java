package com.example.fitnesstrackingapp.domain.response;

import com.example.fitnesstrackingapp.domain.enums.Gender;
import com.example.fitnesstrackingapp.domain.enums.Role;
import lombok.Data;

@Data
public class UserResponse {
    private String email;
    private String fullName;
    private Integer height;
    private Integer weight;
    private Gender gender;
    private String goal;
    private String username;
    private Integer age;
    private Double expectedCalorieIntake;
    private Role role;
}
