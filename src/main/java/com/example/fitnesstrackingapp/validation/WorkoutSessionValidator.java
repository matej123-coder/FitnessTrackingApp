package com.example.fitnesstrackingapp.validation;

import com.example.fitnesstrackingapp.domain.dto.WorkoutSessionDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class WorkoutSessionValidator implements ConstraintValidator<ValidWorkoutSession, WorkoutSessionDto> {

    @Override
    public boolean isValid(WorkoutSessionDto workoutSessionDto, ConstraintValidatorContext constraintValidatorContext) {
        if(workoutSessionDto.getWorkoutType()==null){
            return false;
        }
        boolean valid = true;
        constraintValidatorContext.disableDefaultConstraintViolation();
        if("Runtime".equalsIgnoreCase(workoutSessionDto.getWorkoutType())){
            if (workoutSessionDto.getPace()==null || workoutSessionDto.getDistance()==null){
                constraintValidatorContext.buildConstraintViolationWithTemplate("Runtime workout requires pace and distance")
                        .addConstraintViolation();
                valid=false;
            }
            if (workoutSessionDto.getExercises() != null && !workoutSessionDto.getExercises().isEmpty()) {
                constraintValidatorContext.buildConstraintViolationWithTemplate("Runtime workout cannot have exercises")
                        .addConstraintViolation();
                valid = false;
            }
        }
        if("Weight".equalsIgnoreCase(workoutSessionDto.getWorkoutType())){
            if(workoutSessionDto.getExercises().isEmpty()){
                constraintValidatorContext.buildConstraintViolationWithTemplate("Weight workout requires at least one exercise")
                        .addConstraintViolation();
                valid = false;
            }
            if(workoutSessionDto.getPace()!=null || workoutSessionDto.getDistance()!=null){
                constraintValidatorContext.buildConstraintViolationWithTemplate("Weight workout should not have pace or distance")
                        .addConstraintViolation();
                valid = false;
            }
        }
        return valid;
    }
}
