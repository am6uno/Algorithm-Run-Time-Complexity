package com.complexity.encounter.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
* This service contains the business logic for Problem objects.
*/

@Service
public class ProblemService {
    @Autowired
    private ProblemRepository problemRepository;

    /**
     * <p>
     *     Creates a problem
     * </p>
     * @param problem the problem to add
     */
    public void saveProblem(Problem problem) {
        problemRepository.save(problem);
    }

    /**
     * <p>
     *     Retrieves all of the problems
     * </p>
     * @return the list of problems
     */
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    /**
     * <p>
     *     Retrieves a problem
     * </p>
     * @param id the id of desired problem
     * @return the problem
     */
    public Optional<Problem> getProblemById(long id) {
        return problemRepository.findById(id);
    }

    public List<Problem> getProblemsBySetId(long setId) {
        return problemRepository.findBySetId(setId);
    }

    /**
     * <p>
     *     Deletes a problem
     * </p>
     * @param id the id of the problem to delete
     */
    public void deleteProblem(long id) {
        problemRepository.deleteById(id);
    }

    /**
     * <p>
     *     Updates a problem
     * </p>
     * @param problem the problem to update
     */
    public void updateProblem(Problem problem, Long id) {
        Optional<Problem> updatedProblem = problemRepository.findById(id);
        updatedProblem.get().setSetId(problem.getSetId());
        updatedProblem.get().setName(problem.getName());
        updatedProblem.get().setSourceCode(problem.getSourceCode());
        updatedProblem.get().setComplexity(problem.getComplexity());
        updatedProblem.get().setHints(problem.getHints());
        updatedProblem.get().setTotalScore(problem.getTotalScore());
        problemRepository.save(updatedProblem.get());
    }
}
