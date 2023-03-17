package com.complexity.encounter.solution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    public void saveSolution(Solution solution) {
        solutionRepository.save(solution);
    }
    public List<Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }
    public Optional<Solution> getSolutionById(Long id) {
        return solutionRepository.findById(id);
    }
    public List<Solution> getSolutionsByStudentId(long studentId) {
        return solutionRepository.findByStudentId(studentId);
    }

    public List<Solution> getSolutionsByProblemId(long problemId) {
        return solutionRepository.findByProblemId(problemId);
    }

    public Optional<Solution> getSolutionByStudentAndProblem(long studentId, long problemId) {
        return solutionRepository.findByStudentIdAndProblemId(studentId, problemId);
    }

    public void deleteSolution(Long id) {
        solutionRepository.deleteById(id);
    }

    public void updateSolution(Solution solution, Long id) {
          Optional<Solution> updatedSolution = solutionRepository.findById(id);
        updatedSolution.get().setStudentId(solution.getStudentId());
        updatedSolution.get().setStudentId(solution.getStudentId());
        updatedSolution.get().setProblemId(solution.getProblemId());
        updatedSolution.get().setComplexityAnswer(solution.getComplexityAnswer());
        updatedSolution.get().setScore(solution.getScore());
        solutionRepository.save(updatedSolution.get());
    }
}
