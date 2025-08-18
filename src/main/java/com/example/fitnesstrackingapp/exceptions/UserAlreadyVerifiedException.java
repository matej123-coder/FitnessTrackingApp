package com.example.fitnesstrackingapp.exceptions;

public class UserAlreadyVerifiedException extends RuntimeException{
    public UserAlreadyVerifiedException(String message){
        super(message);
    }
}
