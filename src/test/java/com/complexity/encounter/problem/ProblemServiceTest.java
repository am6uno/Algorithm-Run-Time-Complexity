package com.complexity.encounter.problem;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

class ProblemServiceTest {

    @Autowired
    private ProblemRepository problemRepository;
    private AutoCloseable autoCloseable;
    private ProblemService problemService;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        problemService = new ProblemService();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void saveProblem() {
    }

    @Test
    void getAllProblems() {
        // when
        problemService.getAllProblems();
        // then
        verify(problemRepository).findAll();
    }

    @Test
    void getProblemById() {
    }

    @Test
    void deleteProblem() {
    }

    @Test
    void updateProblem() {
    }
}