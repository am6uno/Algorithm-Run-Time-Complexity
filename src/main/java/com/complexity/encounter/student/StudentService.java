package com.complexity.encounter.student;
import com.complexity.encounter.classroom.Classroom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
* This service contains the business logic for Student objects.
*/

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    /**
     * Communicates with the database to create a new Student object.
     * @param student Student object containing the new data to be added.
     */
    public void saveStudent(Student student) { studentRepository.save(student);}
    /**
     * Queries the database to look up all Student objects and returns them as a List
     * @return The list of all Student objects.
     */
    public List<Student> getAllStudents() {return studentRepository.findAll();}
    /**
     * Queries the database using the passed id value and converts the result into an
     * Optional object.
     * @param id The id used in the query to look up a Student
     * @return An Optional object which contains the Student object on a hit.
     */
    public Optional<Student> getStudentById(long id) {System.out.print("!!!"); return studentRepository.findById(id);}
    /**
     * Queries the database using the pass email address and converts the result into
     * and Optional object.
     * @param email The email address used in the query.
     * @return An Optional object which contains the Student object on a hit.
     */
    public Optional<Student> getStudentByEmail(String email){ return studentRepository.findByEmail(email);}
    /**
     * This method returns all the classes that a student is enrolled to.
     * @param id The id of the student
     * @return A classroom list
     */
    public  List<Classroom> getStudentClassrooms(long id) {
        return studentRepository.findById(id).get().getEnrolled_classrooms();
    }
    /**
     * Deletes a Student object from the database.
     * @param id The id of the Student to be deleted.
     */
    public void deleteStudent(long id) {
        // To-do: Find out if I need to manage classrooms here.
        studentRepository.deleteById(id);
    }
    /**
     * Updates the database with contents of the passed Student Object.
     * @param student A Student object with updated information.
     * @param id The id of the Student being updated.
     */
    public void updateStudent(Student student, Long id) {
        Optional<Student> updatedStudent = studentRepository.findById(id);
        updatedStudent.get().setEmail(student.getEmail());
        updatedStudent.get().setFirst_name(student.getFirst_name());
        updatedStudent.get().setLast_name(student.getLast_name());
        updatedStudent.get().setPassword_hash(student.getPassword_hash());
//        updatedStudent.get().setEnrolled_classes(student.getEnrolled_classes());
        studentRepository.save(updatedStudent.get());
    }

    public  Long[] getStudentClassrooms(long id) {
        Optional<Long[]> ids = studentRepository.findByEnrollment(id);
        return ids.get();
    }
}
