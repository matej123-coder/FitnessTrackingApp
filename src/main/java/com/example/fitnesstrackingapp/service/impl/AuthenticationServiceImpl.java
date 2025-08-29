package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.domain.dto.*;
import com.example.fitnesstrackingapp.domain.enums.Gender;
import com.example.fitnesstrackingapp.domain.enums.Role;
import com.example.fitnesstrackingapp.domain.response.RegisterResponse;
import com.example.fitnesstrackingapp.exceptions.*;
import com.example.fitnesstrackingapp.mapper.UserMapper;
import com.example.fitnesstrackingapp.repository.UserRepository;
import com.example.fitnesstrackingapp.service.AuthenticationService;
import jakarta.mail.MessagingException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final UserMapper userMapper;

    public AuthenticationServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, EmailService emailService, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
        this.userMapper = userMapper;
    }

    @Override
    public void signup(RegisterUserDto registerUserDto) {
        Optional<User> existingUser = userRepository.findByEmail(registerUserDto.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyLoggedIn("Email already registered");
        }
        Optional<User > existing = userRepository.findByUsername(registerUserDto.getUsername());
        if (existing.isPresent()) {
            throw new UserAlreadyLoggedIn("Username already exists enter a new one");
        }

        User newUser = userMapper.toModel(registerUserDto);
        newUser.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        newUser.setVerificationCode(generateVerificationCode());
        newUser.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
        newUser.setRole(Role.USER);
        newUser.setEnabled(false);

        sendVerificationEmail(newUser);
        userRepository.save(newUser);
    }

    @Override
    public User signin(LoginDto loginDto) {
        User user = userRepository
                .findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found wrong email"));
        if (!user.isEnabled()) {
            throw new UserNotVerifiedException("Account not verified. Please verify your account");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );
        return user;
    }

    @Override
    public RegisterResponse verifyUser(VerifyUserDto verifyUserDto) {
        RegisterResponse response = new RegisterResponse();
        Optional<User> user = userRepository.findByEmail(verifyUserDto.getEmail());
        if (user.isPresent()) {
            User user1 = user.get();
            if (user1.isEnabled()) {
                throw new UserAlreadyVerifiedException("User is already verified");
            }
            if (user1.getVerificationCode().equals(verifyUserDto.getVerificationCode())) {
                user1.setEnabled(true);
                user1.setVerificationCode(null);
                user1.setVerificationCodeExpiresAt(null);
                user1.setExpectedCalorieIntake(calculateCalorieIntake(
                        user1.getWeight(),
                        user1.getHeight(),
                        user1.getAge(),
                        user1.getGender(),
                        user1.getGoal()));
                response.setEstimatedCalorieIntake(user1.getExpectedCalorieIntake());
                userRepository.save(user1);
                return response;
            } else {
                throw new WrongVerificationCodeException("Invalid verification code");
            }
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    public Double calculateCalorieIntake(int weightKg, int heightCm, int age, Gender gender, String goal) {
        double bmr;

        if (gender == Gender.Male) {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }

        return switch (goal) {
            case "Gain Weight" -> bmr + 500;
            case "Lose Weight" -> bmr - 500;
            default -> bmr;
        };
    }

    @Override
    public void resendVerificationEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new UserAlreadyVerifiedException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

    @Override
    public void resetPassword(ResetPasswordDto resetPasswordDto) {
        Optional<User> existingUser = this.userRepository.findByEmail(resetPasswordDto.getEmail());
        if (existingUser.isEmpty()) {
            throw new UserNotFoundException("Wrong email user not found");
        }
        User oldUser = existingUser.get();
        oldUser.setResetPasswordToken(generatePasswordToken());
        oldUser.setResetPasswordTokenExpiresAt(LocalDateTime.now().plusMinutes(15));
        sendResetPasswordEmail(oldUser);
        this.userRepository.save(oldUser);
    }

    @Override
    public void changePassword(ChangePasswordDto changePasswordDto) {
        Optional<User> existingUser = this.userRepository.findByResetPasswordToken(changePasswordDto.getResetPasswordToken());
        if (existingUser.isEmpty()) {
            throw new UserNotFoundException("Wrong reset password token");
        }
        User user = existingUser.get();
        if (user.getResetPasswordTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset password token has expired");
        }
        user.setPassword(passwordEncoder.encode(changePasswordDto.getNewPassword()));
        user.setResetPasswordToken(null);
        user.setResetPasswordTokenExpiresAt(null);
        userRepository.save(user);
    }

    public String generatePasswordToken() {
        return UUID.randomUUID().toString();
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private void sendResetPasswordEmail(User user) {
        String subject = "Reset Password";
        String resetPasswordToken = user.getResetPasswordToken();
        String resetLink = "http://localhost:5173/change-password?token=" + resetPasswordToken;

        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Reset Your Password</h2>"
                + "<p style=\"font-size: 16px;\">Click the button below to reset your password:</p>"
                + "<a href=\"" + resetLink + "\" style=\""
                + "display: inline-block;"
                + "padding: 10px 20px;"
                + "font-size: 16px;"
                + "color: #fff;"
                + "background-color: #007bff;"
                + "text-decoration: none;"
                + "border-radius: 5px;"
                + "margin-top: 10px;"
                + "\">Reset Password</a>"
                + "<p style=\"font-size: 14px; margin-top: 20px; color: #777;\">"
                + "If you didn't request this, you can ignore this email.</p>"
                + "</div>"
                + "</body>"
                + "</html>";
        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
