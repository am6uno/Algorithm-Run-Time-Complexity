package com.complexity.encounter.student;
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

    public void saveStudent(Student student) { studentRepository.save(student);}

    public List<Student> getAllStudents() {return studentRepository.findAll();}

    public Optional<Student> getStudentById(long id) {return studentRepository.findById(id);}

    public Optional<Student> getStudentByEmail(String email){ return studentRepository.findByEmail(email);}

    public void deleteStudent(long id) {
        // To-do: Find out if I need to manage classrooms here.
        studentRepository.deleteById(id);
    }

    public void updateStudent(Student student, Long id) {
        Optional<Student> updatedStudent = studentRepository.findById(id);
        updatedStudent.get().setEmail(student.getEmail());
        updatedStudent.get().setFirst_name(student.getFirst_name());
        updatedStudent.get().setLast_name(student.getLast_name());
        updatedStudent.get().setPassword_hash(student.getPassword_hash());
        updatedStudent.get().setEnrolled_classes(student.getEnrolled_classes());
        studentRepository.save(updatedStudent.get());
    }
}
