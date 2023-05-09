package com.complexity.encounter.classroom;

import com.complexity.encounter.student.Student;
import com.complexity.encounter.teacher.Teacher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * This is the repository for the Classroom object.
 */
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

    @Transactional
    @Modifying
    @Query("update Classroom c set c.enrolled_students = ?1 where c.id = ?2")
    int addStudent(Set<Student> students, Long id);

    List<Classroom> findByTeacher(Teacher teacher);
    Classroom findFirstByAccessCode(String access_code);

}
