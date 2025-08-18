package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.DailyTracking;
import com.example.fitnesstrackingapp.domain.dto.DailyTrackingDto;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponse;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponsePage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DailyTrackingMapper {
    public DailyTrackingResponse modelToResponse(DailyTracking dailyTracking) {
        DailyTrackingResponse dailyTrackingResponse = new DailyTrackingResponse();
        dailyTrackingResponse.setDailySteps(dailyTracking.getDailySteps());
        dailyTrackingResponse.setDailyWaterIntake(dailyTracking.getDailyWaterIntake());
        dailyTrackingResponse.setUserId(dailyTracking.getUserId());
        dailyTrackingResponse.setId(dailyTracking.getId());
        dailyTrackingResponse.setCreatedAt(dailyTracking.getCreatedAt());
        return dailyTrackingResponse;
    }

    public DailyTracking dtoToModel(DailyTrackingDto dailyTrackingDto, Long userId) {
        DailyTracking dailyTracking = new DailyTracking();
        dailyTracking.setCreatedAt(LocalDate.now());
        dailyTracking.setDailySteps(dailyTrackingDto.getDailySteps());
        dailyTracking.setDailyWaterIntake(dailyTracking.getDailyWaterIntake());
        dailyTracking.setUserId(userId);
        return dailyTracking;
    }

    public DailyTracking updateDtoToModel(DailyTrackingDto dailyTrackingDto, DailyTracking dailyTracking) {
        dailyTracking.setCreatedAt(LocalDate.now());
        dailyTracking.setDailySteps(dailyTracking.getDailySteps());
        dailyTracking.setDailyWaterIntake(dailyTracking.getDailyWaterIntake());
        return dailyTracking;
    }

    public DailyTrackingResponsePage responseToResponsePage(Page<DailyTracking> dailyTrackings, List<DailyTrackingResponse> content) {
        DailyTrackingResponsePage dailyTrackingResponsePage = new DailyTrackingResponsePage();
        dailyTrackingResponsePage.setContent(content);
        dailyTrackingResponsePage.setPageSize(dailyTrackings.getSize());
        dailyTrackingResponsePage.setPageNo(dailyTrackings.getNumber());
        dailyTrackingResponsePage.setTotalPages(dailyTrackingResponsePage.getTotalPages());
        dailyTrackingResponsePage.setTotalElements(dailyTrackingResponsePage.getTotalElements());
        dailyTrackingResponsePage.setLast(dailyTrackingResponsePage.isLast());
        return dailyTrackingResponsePage;
    }
}
