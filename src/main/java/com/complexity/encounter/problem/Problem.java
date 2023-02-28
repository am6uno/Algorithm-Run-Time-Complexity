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
    private String name;
    private String[] sourceCode; // stored as an array of lines
    private String[] complexity; // stored as an array of lines
    private int totalScore;     // this would need to be stored on the student account
    private int currentScore;   // this would need to be stored on the student account
}