package com.example.fitnesstrackingapp.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ChangePasswordDto {
    @NotBlank(message = "New password is required")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$",
            message = "Password must be at least 6 characters and include one uppercase letter, one number, and one special character"
    )
    private String newPassword;
    @NotBlank(message = "Reset password token is required")
    private String resetPasswordToken;
}
