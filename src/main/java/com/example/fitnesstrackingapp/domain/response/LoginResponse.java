package com.example.fitnesstrackingapp.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String jwtToken;
    private Long expiresIn;
}
