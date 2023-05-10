package com.complexity.encounter.solution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
* This service contains the business logic for Solution objects.
*/

@Service
public class SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    /**
     * Saves the passed Solution to the repository
     * @param solution - the Solution object to save
     */
    public void saveSolution(Solution solution) {
        solutionRepository.save(solution);
    }

    /**
     * Returns all Solutions in the repository
     * @return a list of all Solutions
     */
    public List<Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }

    /**
     * Returns a Solution by its id
     * @param id - the Solution's id
     * @return the repository request to find the Solution
     */
    public Optional<Solution> getSolutionById(Long id) {
        return solutionRepository.findById(id);
    }

    /**
     * Returns a list of Solutions associated with a Student
     * @param studentId - the id of the Student
     * @return the repository request to find the Solutions
     */
    public List<Solution> getSolutionsByStudentId(long studentId) {
        return solutionRepository.findByStudentId(studentId);
    }

    /**
     * Returns a list of Solutions associated with a given Problem
     * @param problemId - the Problem's id
     * @return - repository request for the Solution list
     */
    public List<Solution> getSolutionsByProblemId(long problemId) {
        return solutionRepository.findByProblemId(problemId);
    }

    /**
     * Returns a Solution associated with a Student and a Problem
     * @param studentId - the Student's id
     * @param problemId - the Problem's d
     * @return the repository request to find the Solution
     */
    public Optional<Solution> getSolutionByStudentAndProblem(long studentId, long problemId) {
        return solutionRepository.findByStudentIdAndProblemId(studentId, problemId);
    }

    /**
     * Deletes a Solution from the repository
     * @param id - the id of the Solution to be deleted
     */
    public void deleteSolution(Long id) {
        solutionRepository.deleteById(id);
    }

    /**
     * Updates a Solution in the repository
     * @param solution - the new Solution data
     * @param id - the id of the Solution being updated
     */
    public void updateSolution(Solution solution, Long id) {
          Optional<Solution> updatedSolution = solutionRepository.findById(id);
        updatedSolution.get().setStudentId(solution.getStudentId());
        updatedSolution.get().setProblemId(solution.getProblemId());
        updatedSolution.get().setComplexityAnswer(solution.getComplexityAnswer());
        updatedSolution.get().setOverallComplexity(solution.getOverallComplexity());
        updatedSolution.get().setScore(solution.getScore());
        solutionRepository.save(updatedSolution.get());
    }
}
