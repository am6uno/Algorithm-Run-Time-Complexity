package com.complexity.encounter.student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * The repository for the Student object.
 */

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
}
