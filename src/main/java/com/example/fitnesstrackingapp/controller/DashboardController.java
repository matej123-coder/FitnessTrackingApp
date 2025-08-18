package com.example.fitnesstrackingapp.controller;

import com.example.fitnesstrackingapp.domain.User;
import com.example.fitnesstrackingapp.service.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String,Double>> getDashboardData(@AuthenticationPrincipal User user,
                                                               @RequestParam(required = false,defaultValue = "all") String period){
        return ResponseEntity.status(HttpStatus.OK).body(dashboardService.dashboardCounts(period, user.getId()));
    }
}
