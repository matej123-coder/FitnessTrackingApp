package com.example.fitnesstrackingapp.exceptions;

public class WorkoutNotFounException extends RuntimeException{
    public WorkoutNotFounException(String message){
        super(message);
    }
}
