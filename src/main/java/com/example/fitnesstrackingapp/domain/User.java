package com.example.fitnesstrackingapp.domain;

import com.example.fitnesstrackingapp.domain.enums.Gender;
import com.example.fitnesstrackingapp.domain.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String fullName;
    private Integer weight;
    private Integer height;
    private String goal;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Double expectedCalorieIntake;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean enabled;
    @Column(name = "verification_code")
    private String verificationCode;
    @Column(name = "verification_code_exp")
    private LocalDateTime verificationCodeExpiresAt;
    @Column(name="reset_password_token")
    private String resetPasswordToken;
    @Column(name = "reset_password_token_exp")
    private LocalDateTime resetPasswordTokenExpiresAt;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_" + role.name());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
