package com.complexity.encounter.problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * This is the repository for the Problem object.
 */
public interface ProblemRepository extends JpaRepository<Problem, Long> {
    List<Problem> findBySetId(long setId);
}