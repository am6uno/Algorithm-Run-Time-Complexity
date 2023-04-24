package com.complexity.encounter.classroom;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.complexity.encounter.student.Student;
import com.complexity.encounter.student.StudentRepository;
import com.complexity.encounter.student.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
* This service contains the business logic for Classroom objects.
*/

@Service
public class ClassroomService {
    @Autowired
    private ClassroomRepository classroomRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentService studentService;

    /**
     * Communicates with the database to create a new Classroom object.
     * @param classroom Classroom object containing the new data to be added.
     */
    public void saveClassroom(Classroom classroom) {classroomRepository.save(classroom);}

    /**
     * Queries the database to look up all Classroom objects and returns them as a List
     * @return The list of all Classroom objects.
     */
    public List<Classroom> getAllClassrooms() {return classroomRepository.findAll();}

    /**
     * Queries the database using the passed id value and converts the result into an
     * Optional object.
     * @param id The id used in the query to look up a Classroom
     * @return An Optional object which contains the Classroom object on a hit.
     */
    public Optional<Classroom> getClassroomById(Long id) {return classroomRepository.findById(id);}


    /**
     * Deletes a Classroom object from the database.
     * @param id The id of the Classroom to be deleted.
     */
    public void deleteClassroom(Long id) {classroomRepository.deleteById(id);}

    /**
     * Updates the database with contents of the passed Classroom Object.
     * @param classroom A Classroom object with updated information.
     * @param id The id of the Classroom being updated.
     */
    @Transactional
    @Modifying
    public Classroom updateClassroom(Classroom classroom, Long id) {
        Optional<Classroom> updatedClassroom = classroomRepository.findById(id);
        updatedClassroom.get().setEnrolled_students(classroom.getEnrolled_students());
        return classroomRepository.save(updatedClassroom.get());
    }

    public Classroom addStudent(Long classroom_id, Long student_id) {
        Optional<Student> student = studentService.getStudentById(student_id);
        Optional<Classroom> updatedClassroom = getClassroomById(classroom_id);
        Set<Student> updatedStudents = updatedClassroom.get().getEnrolled_students();
        System.out.println(student);
        System.out.println(updatedStudents.getClass());
        return classroomRepository.save(updatedClassroom.get());
    }
}
