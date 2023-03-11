package com.complexity.encounter.solution;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SolutionRepository extends JpaRepository<Solution, Long> {
    Optional<Solution> findByStudentId(long studentId);
    Optional<Solution> findByProblemId(long studentId);
    Optional<Solution> findByStudentIdAndProblemId(long studentId, long problemId);
}