package com.example.fitnesstrackingapp.service.impl;

import com.example.fitnesstrackingapp.domain.Goal;
import com.example.fitnesstrackingapp.domain.dto.GoalDto;
import com.example.fitnesstrackingapp.domain.enums.Status;
import com.example.fitnesstrackingapp.domain.response.GoalResponse;
import com.example.fitnesstrackingapp.domain.response.GoalResponsePage;
import com.example.fitnesstrackingapp.exceptions.GoalNotFoundException;
import com.example.fitnesstrackingapp.mapper.GoalMapper;
import com.example.fitnesstrackingapp.repository.GoalRepository;
import com.example.fitnesstrackingapp.service.GoalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GoalServiceImpl implements GoalService {
    private final GoalRepository goalRepository;
    private final GoalMapper goalMapper;

    public GoalServiceImpl(GoalRepository goalRepository, GoalMapper goalMapper) {
        this.goalRepository = goalRepository;
        this.goalMapper = goalMapper;
    }

    @Override
    public GoalResponse getById(Long id) {
        Goal goal = goalRepository
                .findById(id)
                .orElseThrow(() -> new GoalNotFoundException("Goal not found"));
        return goalMapper.modelToResponse(goal);
    }

    @Override
    public GoalResponsePage getAllByUserId(Long userId, int pageNo, int pageSize) {
        Pageable page = PageRequest.of(pageNo, pageSize, Sort.by(Sort.Direction.ASC, "title"));
        Page<Goal> goals = goalRepository.findAllByUserId(userId, page);
        List<Goal> goalsList = goals.getContent();
        goalsList.forEach(goal -> {
            if (goal.getEndDate().isBefore(LocalDate.now()) && goal.getGoalStatus()==Status.IN_PROGRESS) {
                goal.setGoalStatus(Status.FAILED);
            }
        });
        goalRepository.saveAll(goalsList);
        List<GoalResponse> content = goalsList.stream().map((goalMapper::modelToResponse)).toList();
        return goalMapper.responseToResponsePage(goals, content);

    }

    @Override
    public void createMeal(GoalDto goalDto, Long userId) {
        this.goalRepository.save(goalMapper.dtoToModel(goalDto, userId));
    }

    @Override
    public void updateMeal(GoalDto goalDto, Long id) {
        Goal goal = goalRepository
                .findById(id)
                .orElseThrow(() -> new GoalNotFoundException("Goal not found"));
        this.goalRepository.save(this.goalMapper.updateDtoToModel(goalDto, goal));
    }

    @Override
    public void deleteMeal(Long id) {
        this.goalRepository.deleteById(id);
    }
}
