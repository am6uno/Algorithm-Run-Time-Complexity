package com.complexity.encounter.student;

import com.complexity.encounter.classroom.Classroom;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
* This POJO class establishes the Student object for our database.
*/

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue
    private Long id;
    private String email;
    private String first_name;
    private String last_name;
    @ManyToMany(mappedBy = "enrolled_students")
    private Set<Classroom> enrolled_classes;
    private char[] password_hash;

}
