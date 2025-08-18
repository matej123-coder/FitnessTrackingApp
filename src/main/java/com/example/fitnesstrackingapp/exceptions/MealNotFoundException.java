package com.example.fitnesstrackingapp.exceptions;

public class MealNotFoundException extends RuntimeException{
    public MealNotFoundException(String message){
        super(message);
    }
}
