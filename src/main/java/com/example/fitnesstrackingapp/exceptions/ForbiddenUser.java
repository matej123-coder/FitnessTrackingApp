package com.example.fitnesstrackingapp.exceptions;

public class ForbiddenUser extends RuntimeException{
    public ForbiddenUser(String message){
        super(message);
    }
}
