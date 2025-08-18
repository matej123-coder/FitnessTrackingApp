package com.example.fitnesstrackingapp.domain.response;

import com.example.fitnesstrackingapp.domain.dto.DailyTrackingDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyTrackingResponsePage {
    private List<DailyTrackingResponse> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
