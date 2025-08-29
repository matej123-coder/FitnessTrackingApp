package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.DailyTracking;
import com.example.fitnesstrackingapp.domain.dto.DailyTrackingDto;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponse;
import com.example.fitnesstrackingapp.domain.response.DailyTrackingResponsePage;
import com.example.fitnesstrackingapp.exceptions.DailyTrackingNotFound;
import com.example.fitnesstrackingapp.mapper.DailyTrackingMapper;
import com.example.fitnesstrackingapp.repository.DailyTrackingRepository;
import com.example.fitnesstrackingapp.service.DailyTrackingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DailyTrackingServiceImpl implements DailyTrackingService {
    private final DailyTrackingRepository dailyTrackingRepository;
    private final DailyTrackingMapper dailyTrackingMapper;

    public DailyTrackingServiceImpl(DailyTrackingRepository dailyTrackingRepository, DailyTrackingMapper dailyTrackingMapper) {
        this.dailyTrackingRepository = dailyTrackingRepository;
        this.dailyTrackingMapper = dailyTrackingMapper;
    }

    @Override
    public DailyTrackingResponse getById(Long id) {
        DailyTracking dailyTracking =
                dailyTrackingRepository
                        .findById(id)
                        .orElseThrow(() -> new DailyTrackingNotFound("Daily data not found"));
        return dailyTrackingMapper.modelToResponse(dailyTracking);
    }

    @Override
    public DailyTrackingResponsePage getAllByUserId(Long userId, int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.ASC, "createdAt"));
        Page<DailyTracking> dailyTrackings = this.dailyTrackingRepository.findAllByUserId(userId, pageable);
        List<DailyTrackingResponse> dailyTrackingResponses = dailyTrackings.getContent().stream().map((dailyTrackingMapper::modelToResponse)).toList();
        return dailyTrackingMapper.responseToResponsePage(dailyTrackings, dailyTrackingResponses);
    }

    @Override
    public void createMeal(DailyTrackingDto dailyTrackingDto, Long userId) {
        dailyTrackingRepository.save(dailyTrackingMapper.dtoToModel(dailyTrackingDto,userId));
    }

    @Override
    public void updateMeal(DailyTrackingDto dailyTrackingDto, Long id) {
        DailyTracking dailyTracking =
                dailyTrackingRepository
                        .findById(id)
                        .orElseThrow(() -> new DailyTrackingNotFound("Daily data not found"));
        dailyTrackingRepository.save(dailyTrackingMapper.updateDtoToModel(dailyTrackingDto,dailyTracking));
    }

    @Override
    public void deleteMeal(Long id) {
        dailyTrackingRepository.deleteById(id);
    }
}
