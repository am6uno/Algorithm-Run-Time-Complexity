package com.complexity.encounter.problem;

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
public class Problem {
    @Id
    @GeneratedValue

    private long id;
    private long setId;
    private String name;
    private String[] sourceCode; // stored as an array of lines
    private String[] complexity; // stored as an array of lines
    private String[] hints;      // stored as an array of lines
    private String overallComplexity;
    private int totalScore;
}