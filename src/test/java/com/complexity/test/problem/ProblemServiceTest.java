package com.complexity.test.problem;

import com.complexity.encounter.problem.Problem;
import com.complexity.encounter.problem.ProblemRepository;
import com.complexity.encounter.problem.ProblemService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ExtendWith(MockitoExtension.class)
class ProblemServiceTest {

    @Mock
    private ProblemRepository problemRepository;
    @InjectMocks
    private ProblemService problemService;

    Problem testProblem1 = new Problem(
            100,
            200,
            "For Loop Analysis",
            new String[]{"for (int i = 0; i < 2; i++) {", "// Do something", "}"},
            new String[]{"o(n)", "o(1)", "o(1)"},
            new String[]{"The progression here is linear.", "The execution here is constant.",
                    "The execution here is constant."},
            "o(n)",
            3);

    Problem testProblem2 = new Problem(
            101,
            201,
            "While Analysis",
            new String[]{"while (true) {", "// Do something", "}"},
            new String[]{"o(?)", "o(1)", "o(1)"},
            new String[]{"The progression here is unknown.", "The execution here is constant.",
                    "The execution here is constant."},
            "o(n)",
            7);

    @Test
    void saveProblem() {
        when(problemRepository.save(any(Problem.class))).thenReturn(testProblem1);
        assertAll(() -> problemService.saveProblem(testProblem1));
    }

    @Test
    void getAllProblems() {

        List<Problem> testProblems = new ArrayList<>(Arrays.asList(testProblem1, testProblem2));

        when(problemRepository.findAll()).thenReturn(testProblems);
        assertNotNull(problemService.getAllProblems());
    }

    @Test
    void getProblemById() {
        when(problemRepository.findById(100L)).thenReturn(Optional.ofNullable(testProblem1));
        assertNotNull(problemService.getProblemById(100L));
    }

    @Test
    void deleteProblem() {
        doNothing().when(problemRepository).deleteById(100L);
        assertAll(() -> problemService.deleteProblem(100L));
    }

    @Test
    void updateProblem() {
        when(problemRepository.findById(anyLong())).thenReturn(Optional.ofNullable(testProblem1));
        assertAll(() -> problemService.updateProblem(testProblem2, 100L));
    }
}