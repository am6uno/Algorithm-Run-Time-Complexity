package com.complexity.encounter.student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

/**
 * The repository for the Student object.
 */

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);

    @Query(value = "SELECT classroom_id FROM classroom_set where student_id = :student_id", nativeQuery = true)
    Optional<Long[]> findByEnrollment(@Param("student_id") Long student_id);
}
