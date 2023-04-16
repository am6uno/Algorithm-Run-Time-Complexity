package com.complexity.encounter.problemset;
import com.complexity.encounter.solution.Solution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * This is the repository for the ProblemSet class.
 * @Author Cole Gregory
 */
public interface ProblemSetRepository extends JpaRepository<ProblemSet, Long>{

    List<ProblemSet> findByClassroomId(long classroomId);
}