package com.complexity.encounter.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        updatedProblem.get().setName(problem.getName());
        updatedProblem.get().setSourceCode(problem.getSourceCode());
        updatedProblem.get().setComplexity(problem.getComplexity());
        updatedProblem.get().setTotalScore(problem.getTotalScore());
        updatedProblem.get().setCurrentScore(problem.getCurrentScore());
        problemRepository.save(updatedProblem.get());
    }
}
