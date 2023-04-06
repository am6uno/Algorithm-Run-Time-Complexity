package com.complexity.encounter.teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByTeacherEmail(String email);
}
