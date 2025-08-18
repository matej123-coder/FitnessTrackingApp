package com.example.fitnesstrackingapp.exceptions;

public class DailyTrackingNotFound extends RuntimeException {
    public DailyTrackingNotFound (String message){
        super(message);
    }
}
