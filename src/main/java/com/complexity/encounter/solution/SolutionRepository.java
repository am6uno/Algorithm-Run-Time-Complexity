package com.complexity.encounter.solution;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface SolutionRepository extends JpaRepository<Solution, Long> {
    List<Solution> findByStudentId(long studentId);
    List<Solution> findByProblemId(long studentId);
    Optional<Solution> findByStudentIdAndProblemId(long studentId, long problemId);
}