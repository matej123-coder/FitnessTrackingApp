package com.example.fitnesstrackingapp.mapper;

import com.example.fitnesstrackingapp.domain.Goal;
import com.example.fitnesstrackingapp.domain.dto.GoalDto;
import com.example.fitnesstrackingapp.domain.enums.GoalType;
import com.example.fitnesstrackingapp.domain.enums.Status;
import com.example.fitnesstrackingapp.domain.response.GoalResponse;
import com.example.fitnesstrackingapp.domain.response.GoalResponsePage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GoalMapper {
    public Goal dtoToModel(GoalDto goalDto,Long userId) {
        Goal goal = new Goal();
        goal.setGoalStatus(Status.valueOf(goalDto
                .getGoalStatus()
                .toUpperCase()
                .replace(" ", "_")));
        goal.setGoal(GoalType.valueOf(goalDto.getGoal().toUpperCase().replace(" ","_")));
        goal.setDescription(goalDto.getDescription());
        goal.setTitle(goalDto.getTitle());
        goal.setTargetValue(goalDto.getTargetValue());
        goal.setStartDate(goalDto.getStartDate());
        goal.setEndDate(goalDto.getEndDate());
        goal.setUserId(userId);
        return goal;
    }
    public GoalResponse modelToResponse(Goal goal){
        GoalResponse goalResponse = new GoalResponse();
        goalResponse.setGoal(goal.getGoal());
        goalResponse.setDescription(goal.getDescription());
        goalResponse.setGoalStatus(goal.getGoalStatus());
        goalResponse.setStartDate(goal.getStartDate());
        goalResponse.setEndDate(goal.getEndDate());
        goalResponse.setTargetValue(goal.getTargetValue());
        goalResponse.setTitle(goal.getTitle());
        goalResponse.setId(goal.getId());
        goalResponse.setUserId(goal.getUserId());
        return goalResponse;
    }
    public Goal updateDtoToModel(GoalDto goalDto,Goal goal){
        goal.setGoalStatus(Status.valueOf(goalDto
                .getGoalStatus()
                .toUpperCase()
                .replace(" ", "_")));
        goal.setGoal(GoalType.valueOf(goalDto.getGoal().toUpperCase()));
        goal.setDescription(goalDto.getDescription());
        goal.setTitle(goalDto.getTitle());
        goal.setTargetValue(goalDto.getTargetValue());
        goal.setStartDate(goalDto.getStartDate());
        goal.setEndDate(goalDto.getEndDate());
        return goal;
    }
    public GoalResponsePage responseToResponsePage(Page<Goal> goals, List<GoalResponse> content){
        GoalResponsePage goalResponsePage = new GoalResponsePage();
        goalResponsePage.setContent(content);
        goalResponsePage.setPageSize(goals.getSize());
        goalResponsePage.setPageNo(goals.getNumber());
        goalResponsePage.setTotalPages(goals.getTotalPages());
        goalResponsePage.setTotalElements(goals.getTotalElements());
        goalResponsePage.setLast(goals.isLast());
        return goalResponsePage;

    }
}
