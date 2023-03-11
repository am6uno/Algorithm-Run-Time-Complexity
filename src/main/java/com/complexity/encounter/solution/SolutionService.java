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
    public Optional<com.complexity.encounter.solution.Solution> getSolutionByStudentId(long studentId) {
        return solutionRepository.findByStudentId(studentId);
    }

    public Optional<com.complexity.encounter.solution.Solution> getSolutionByProblemId(long problemId) {
        return solutionRepository.findByProblemId(problemId);
    }

    public Optional<com.complexity.encounter.solution.Solution> getSolutionByStudentAndProblem(long studentId, long problemId) {
        return solutionRepository.findByStudentIdAndProblemId(studentId, problemId);
    }

    public void deleteSolution(long id) {
        solutionRepository.deleteById(id);
    }

    public void updateSolution(com.complexity.encounter.solution.Solution solution, Long id) {
          Optional<Solution> updatedSolution = solutionRepository.findById(id);
        updatedSolution.get().setStudentId(solution.getStudentId());
        updatedSolution.get().setStudentId(solution.getStudentId());
        updatedSolution.get().setProblemId(solution.getProblemId());
        updatedSolution.get().setComplexityAnswer(solution.getComplexityAnswer());
        updatedSolution.get().setScore(solution.getScore());
        solutionRepository.save(updatedSolution.get());
    }
}
