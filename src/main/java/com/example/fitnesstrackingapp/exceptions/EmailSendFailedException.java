package com.example.fitnesstrackingapp.exceptions;

public class EmailSendFailedException extends RuntimeException{
    public EmailSendFailedException(String message){
        super(message);
    }
}
