package com.example.fitnesstrackingapp.exceptions;

public class WrongVerificationCodeException extends RuntimeException{
    public WrongVerificationCodeException(String message){
        super(message);
    }
}
