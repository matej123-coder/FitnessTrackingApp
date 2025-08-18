package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerifyUserDto {
    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Verification code is required")
    private String verificationCode;
}
