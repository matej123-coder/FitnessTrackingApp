package com.example.fitnesstrackingapp.exceptions;

public class UserAlreadyLoggedIn extends RuntimeException{
    public UserAlreadyLoggedIn(String message){
        super(message);
    }
}
