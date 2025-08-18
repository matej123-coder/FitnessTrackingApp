package com.example.fitnesstrackingapp.service;

import java.util.Map;

public interface DashboardService {
    Map<String, Double> dashboardCounts(String period, Long userId);
}
