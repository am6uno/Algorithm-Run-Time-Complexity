package com.complexity.encounter.teacher;

import com.complexity.encounter.teacher.Teacher;
import com.complexity.encounter.teacher.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
* This service contains the business logic for Teacher objects.
*/

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;
    /**
     * Communicates with the database to create a new Teacher object.
     * @param teacher Teacher object containing the new data to be added.
     */
    public void saveTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }
    /**
     * Queries the database to look up all Teacher objects and returns them as a List
     * @return The list of all Teacher objects.
     */
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
    /**
     * Queries the database using the passed id value and converts the result into an
     * Optional object.
     * @param id The id used in the query to look up a Teacher
     * @return An Optional object which contains the Teacher object on a hit.
     */
    public Optional<Teacher> getTeacherById(long id) {
        return teacherRepository.findById(id);
    }

    /**
     * Queries the database useing the pass email address and converts the result into
     * and Optional object.
     * @param email The email address used in the query.
     * @return An Optional object which contains the Teacher object on a hit.
     */
    public Optional<Teacher> getTeacherByEmail(String email){ return teacherRepository.findByTeacherEmail(email);}
    /**
     * Deletes a Teacher object from the database.
     * @param id The id of the Teacher to be deleted.
     */
    public void deleteTeacher(long id) {
        teacherRepository.deleteById(id);
    }

    /**
     * Updates the database with contents of the passed Teacher Object.
     * @param teacher A Teacher object with updated information.
     * @param id The id of the Teacher being updated.
     */
    public void updateTeacher(Teacher teacher, Long id) {
        Optional<Teacher> updatedTeacher = teacherRepository.findById(id);
        updatedTeacher.get().setFirst_name(teacher.getFirst_name());
        updatedTeacher.get().setLast_name(teacher.getLast_name());
        updatedTeacher.get().setTeacherEmail(teacher.getTeacherEmail());
        updatedTeacher.get().setPassword_hash(teacher.getPassword_hash());
        teacherRepository.save(updatedTeacher.get());
    }
}
