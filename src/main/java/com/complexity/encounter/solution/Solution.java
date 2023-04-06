package com.complexity.encounter.solution;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Solution {
    @Id
    @GeneratedValue
    private long id;
    private long studentId;
    private long problemId;
    @Column(length = 5000)
    private String[] complexityAnswer;
    @Column(length = 5000)
    private String overallComplexity;
    private int score;

}