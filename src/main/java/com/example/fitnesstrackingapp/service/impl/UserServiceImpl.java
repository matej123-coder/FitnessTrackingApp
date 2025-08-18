package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.response.UserResponse;
import com.example.fitnesstrackingapp.exceptions.UserNotFoundException;
import com.example.fitnesstrackingapp.mapper.UserMapper;
import com.example.fitnesstrackingapp.repository.UserRepository;
import com.example.fitnesstrackingapp.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users=userRepository.findAll();
        return users.stream().map(userMapper::toDto).toList();
    }

    @Override
    public UserResponse getUser(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(()->new UserNotFoundException("User not found"));
        return userMapper.toDto(user);
    }
}
