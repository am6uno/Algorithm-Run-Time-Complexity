import { jest } from '@jest/globals';
import { of } from 'rxjs';

export const mockProblem1 = {
    id: 1,
    name: "problem1",
    sourceCode: ["int x = 4;", "int y = 5;"],
    hints: ["hint 1", "hint 2"],
    complexity: ["O(C)", "O(C)"],
    totalScore: 2,
    overallComplexity: "O(1)"
}
export const mockProblem2 = {
    id: 2,
    name: "problem2",
    sourceCode: ["int x = 4;", "int y = 5;"],
    complexity: ["O(C)", "O(N)"],
    totalScore: 2,
    hints: ["hint 1", "hint 2"],
   overallComplexity: "O(N)"
}

export const mockProblemArray = [mockProblem1, mockProblem2];

const mockAddProblem = jest.fn().mockReturnValue(of(mockProblemArray))

const mockProblemList = jest.fn().mockReturnValue([mockProblem1, mockProblem2])

export const MockProblemService = {
    getAllProblems: mockProblemList,
    addProblem: mockAddProblem,
    getProblemById: jest.fn().mockReturnValue(of(mockProblem1)),
    updateProblem: jest.fn(),
}
