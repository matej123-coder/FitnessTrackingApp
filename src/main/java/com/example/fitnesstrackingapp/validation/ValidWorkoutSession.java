package com.example.fitnesstrackingapp.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = WorkoutSessionValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidWorkoutSession {
String message() default "Invalid workout session data";
Class<?>[] groups() default{};
Class<? extends Payload> [] payload() default {};
}

