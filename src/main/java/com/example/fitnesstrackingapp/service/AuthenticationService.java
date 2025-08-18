package com.example.fitnesstrackingapp.service;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.*;
import com.example.fitnesstrackingapp.domain.response.RegisterResponse;

public interface AuthenticationService {
     void signup(RegisterUserDto registerUserDto);
     User signin(LoginDto loginDto);
     RegisterResponse verifyUser(VerifyUserDto verifyUserDto);
     void resendVerificationEmail(String email);
     void resetPassword(ResetPasswordDto resetPasswordDto);
     void changePassword(ChangePasswordDto changePasswordDto);

}
