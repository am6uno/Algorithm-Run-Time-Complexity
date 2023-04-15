package com.complexity.encounter.classroom;


import com.complexity.encounter.student.Student;
import com.complexity.encounter.teacher.Teacher;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
public class Classroom {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String entryCode;

    @ManyToOne
    @JoinColumn(name="teacher_id", nullable = false)
    private Teacher teacher;

    @ManyToMany
    @JoinTable(
            name="classroom_set",
            joinColumns = @JoinColumn(name="classroom_id"),
            inverseJoinColumns = @JoinColumn(name="student_id")
    )
    private Set<Student> enrolled_students;
}
