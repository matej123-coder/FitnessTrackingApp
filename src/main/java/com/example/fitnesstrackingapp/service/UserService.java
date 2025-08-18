package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.response.UserResponse;

import java.util.List;

public interface UserService {
     List<UserResponse> getAllUsers();
     UserResponse getUser(Long id);
}
