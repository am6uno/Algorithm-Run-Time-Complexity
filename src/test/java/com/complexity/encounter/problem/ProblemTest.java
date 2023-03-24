package com.complexity.encounter.problem;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ProblemTest {
    Problem testProblem = new Problem(
            100,
            200,
            "For Loop Analysis",
            new String[]{"for (int i = 0; i < 2; i++) {", "// Do something", "}"},
            new String[]{"o(n)", "o(1)", "o(1)"},
            new String[]{"The progression here is linear.", "The execution here is constant.",
                    "The execution here is constant."},
            "o(n)",
            3);
    Problem emptyProblem = new Problem();

    @Test
    void getId() {
        assertEquals(100, testProblem.getId());
    }

    @Test
    void getSetId() {
        assertEquals(200, testProblem.getSetId());
    }

    @Test
    void getName() {
        assertEquals("For Loop Analysis", testProblem.getName());
    }

    @Test
    void getSourceCode() {
        assertArrayEquals(new String[]{"for (int i = 0; i < 2; i++) {", "// Do something", "}"},
                testProblem.getSourceCode());
    }

    @Test
    void getComplexity() {
        assertArrayEquals(new String[]{"o(n)", "o(1)", "o(1)"},
                testProblem.getComplexity());
    }

    @Test
    void getHints() {
        assertArrayEquals(new String[]{"The progression here is linear.", "The execution here is constant.",
                        "The execution here is constant."},
                testProblem.getHints());
    }
    @Test
    void getOverallComplexity() {
        assertEquals("o(n)", testProblem.getOverallComplexity());
    }
    @Test
    void getTotalScore() {
        assertEquals(3, testProblem.getTotalScore());
    }

    @Test
    void setId() {
        testProblem.setId(103);
        assertEquals(103, testProblem.getId());
    }

    @Test
    void setSetId() {
        testProblem.setSetId(203);
        assertEquals(203, testProblem.getSetId());
    }

    @Test
    void setName() {
        testProblem.setName("Hard Analysis");
        assertEquals("Hard Analysis", testProblem.getName());
    }

    @Test
    void setSourceCode() {
        String[] newSourceCode = new String[]{"while (1) {", "// Do something", "}"};
        testProblem.setSourceCode(newSourceCode);
        assertEquals(newSourceCode, testProblem.getSourceCode());
    }

    @Test
    void setComplexity() {
        String[] newComplexity = new String[]{"o(?)", "o(1)", "o(1)"};
        testProblem.setComplexity(newComplexity);
        assertEquals(newComplexity, testProblem.getComplexity());
    }

    @Test
    void setHints() {
        String[] newHints = new String[]{"The progression here never ends.", "The execution here is constant.",
                "The execution here is constant."};
        testProblem.setHints(newHints);
        assertEquals(newHints, testProblem.getHints());
    }

    @Test
    void setOverallComplexity() {
        testProblem.setOverallComplexity("o(logn)");
        assertEquals("o(logn)", testProblem.getOverallComplexity());
    }

    @Test
    void setTotalScore() {
        testProblem.setTotalScore(10);
        assertEquals(10, testProblem.getTotalScore());
    }

}