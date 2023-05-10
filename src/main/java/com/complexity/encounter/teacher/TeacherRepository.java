package com.complexity.encounter.teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * The repository for the Teacher object.
 */
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByTeacherEmail(String email);
}
