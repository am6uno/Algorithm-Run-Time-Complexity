package com.complexity.encounter.solution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    public void saveSolution(com.complexity.encounter.solution.Solution solution) {
        solutionRepository.save(solution);
    }
    public List<com.complexity.encounter.solution.Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }
    public Optional<com.complexity.encounter.solution.Solution> getSolutionById(long id) {
        return solutionRepository.findById(id);
    }
    public void deleteSolution(long id) {
        solutionRepository.deleteById(id);
    }
    /* TODO: finish implementation
    public void updateProblem(com.complexity.encounter.solution.Solution solution, Long id) {
          Optional<Solution> updatedProblem = solutionRepository.findById(id);
        updatedProblem.get().setName(problem.getName());
        updatedProblem.get().setSourceCode(problem.getSourceCode());
        updatedProblem.get().setComplexity(problem.getComplexity());
        updatedProblem.get().setTotalScore(problem.getTotalScore());
        updatedProblem.get().setCurrentScore(problem.getCurrentScore());
        problemRepository.save(updatedProblem.get());
    }*/
}
