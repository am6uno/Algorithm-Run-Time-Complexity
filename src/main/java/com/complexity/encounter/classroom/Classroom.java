package com.complexity.encounter.classroom;


import com.complexity.encounter.student.Student;
import com.complexity.encounter.teacher.Teacher;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
* This is the Java class for classroom organization, and holds a reference to
 * the teacher who created the class, as well as a list of students in the class.
 * Classrooms are primarily a method to organize students so that teachers can
 * deploy Problemsets and give feedback.
 * @author Jason Siciliano
*/

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Classroom")
public class Classroom {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name="teacher_id", nullable = false)
    private Teacher teacher;
    @Column(name="access_code")
    private String accessCode;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
            name="classroom_set",
            joinColumns = @JoinColumn(name="classroom_id"),
            inverseJoinColumns = @JoinColumn(name="student_id")
    )
    private List<Student> enrolled_students = new ArrayList<>();

    /**
     * Adds a Student into enrolled_students
     * @param student - the Student being added.
     */
    public void addStudent(Student student){
        enrolled_students.add(student);
    }

    /**
     * Removes a Student from enrolled_students
     * @param student - the Student being removed.
     */
    public void removeStudent(Student student) {
        enrolled_students.remove(student);
    }

}
