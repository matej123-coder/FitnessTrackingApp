package com.example.fitnesstrackingapp.exceptions;

public class UserNotVerifiedException extends RuntimeException{
    public UserNotVerifiedException(String message){
        super(message);
    }
}
