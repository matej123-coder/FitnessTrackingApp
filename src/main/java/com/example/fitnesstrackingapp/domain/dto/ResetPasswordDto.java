package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ResetPasswordDto {
    @NotBlank(message = "Email is required")
    @Email
    private String email;
}
