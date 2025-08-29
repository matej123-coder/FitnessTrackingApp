package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.*;
import com.example.fitnesstrackingapp.domain.response.LoginResponse;
import com.example.fitnesstrackingapp.domain.response.RegisterResponse;
import com.example.fitnesstrackingapp.service.AuthenticationService;
import com.example.fitnesstrackingapp.service.impl.JWTService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JWTService jwtService;
    public AuthenticationController(AuthenticationService authenticationService, JWTService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid RegisterUserDto registerUserDto) {
        authenticationService.signup(registerUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("User has been registered successfully");
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordDto resetPasswordDto){
        this.authenticationService.resetPassword(resetPasswordDto);
        return ResponseEntity.status(HttpStatus.OK).body("A link has been sent to your email");
    }
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody @Valid ChangePasswordDto changePasswordDto){
        this.authenticationService.changePassword(changePasswordDto);
        return ResponseEntity.status(HttpStatus.OK).body("Your password has been changed");
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> signin(@RequestBody @Valid LoginDto loginDto) {
       User authenticatedUser= authenticationService.signin(loginDto);
        Map<String,Object> claims = new HashMap<>();
        claims.put("userId",authenticatedUser.getId());
       String jwtToken=jwtService.generateToken(authenticatedUser,claims);
       LoginResponse loginResponse= new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }
    @PostMapping("/verify-user")
    public ResponseEntity<RegisterResponse> verify(@RequestBody @Valid VerifyUserDto verifyUserDto){
        RegisterResponse response=authenticationService.verifyUser(verifyUserDto);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email){
        authenticationService.resendVerificationEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body("Verification code has been sent");
    }

}
