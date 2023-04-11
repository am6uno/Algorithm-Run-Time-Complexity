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

    public void saveProblem(Problem problem) {
        problemRepository.save(problem);
    }
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }
    public Optional<Problem> getProblemById(long id) {
        return problemRepository.findById(id);
    }
    public void deleteProblem(long id) {
        problemRepository.deleteById(id);
    }
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
