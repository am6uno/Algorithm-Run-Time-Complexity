package com.complexity.encounter.teacher;

import com.complexity.encounter.classroom.Classroom;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
* This Java class holds the user information for teacher type users in the
 * database. It consists of fields for email, first and last name, as well
 * as a set of references to the classrooms that the teacher has created.
 * @author Jason Siciliano
*/

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue
    private long id;
    private String first_name;
    private String last_name;
    private String teacherEmail;
    @OneToMany(mappedBy = "teacher")
    private Set<Classroom> owned_classrooms;
    private char[] password_hash;

}
