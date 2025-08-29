package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.RegisterUserDto;
import com.example.fitnesstrackingapp.domain.enums.Gender;
import com.example.fitnesstrackingapp.domain.enums.Role;
import com.example.fitnesstrackingapp.domain.response.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public User toModel(RegisterUserDto registerUserDto){
        User user = new User();
        user.setAge(registerUserDto.getAge());
        user.setEmail(registerUserDto.getEmail());
        user.setUsername(registerUserDto.getUsername());
        if(registerUserDto.getGender().equals("Male")){
            user.setGender(Gender.Male);
        }else{
            user.setGender(Gender.Female);
        }
        user.setGoal(registerUserDto.getGoal());
        user.setWeight(registerUserDto.getWeight());
        user.setHeight(registerUserDto.getHeight());
        user.setFullName(registerUserDto.getFullName());
        return user;
    }
    public UserResponse toDto(User user){
        UserResponse userDto=new UserResponse();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setHeight(user.getHeight());
        userDto.setWeight(user.getWeight());
        userDto.setFullName(user.getFullName());
        userDto.setAge(user.getAge());
        userDto.setGender(user.getGender());
        userDto.setExpectedCalorieIntake(user.getExpectedCalorieIntake());
        userDto.setUsername(user.getUsername());
        userDto.setGoal(user.getGoal());
        userDto.setRole(user.getRole());
        return userDto;
    }
}
