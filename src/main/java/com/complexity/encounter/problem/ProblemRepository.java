package com.complexity.encounter.problem;

import org.springframework.data.jpa.repository.JpaRepository;
public interface ProblemRepository extends JpaRepository<Problem, Long> {
}