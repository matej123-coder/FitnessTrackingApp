package com.example.fitnesstrackingapp.domain.dto;

import com.example.fitnesstrackingapp.domain.enums.Gender;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterUserDto {
    @NotBlank(message = "Username must not be blank")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password must not be blank")
    @Pattern(
            regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$",
            message = "Password must be at least 6 characters and include one uppercase letter, one number, and one special character"
    )
    private String password;

    @NotBlank(message = "Full name must not be blank")
    private String fullName;

    @NotNull(message = "Weight must not be null")
    private Integer weight;

    @NotNull(message = "Height must not be null")
    private Integer height;
    @Pattern(
            regexp = "Gain Weight|Maintain Weight|Lose Weight",
            message = "Goal must be one of: Gain Weight, Maintain Weight, Lose Weight"
    )
    @NotNull(message = "Goal must not be null")
    private String goal;

    @NotNull(message = "Age must not be null")
    private Integer age;
    @Pattern(regexp = "Male|Female", message = "Gender must be either Male or Female")
    @NotNull(message = "Gender must not be null")
    private String gender;
}
