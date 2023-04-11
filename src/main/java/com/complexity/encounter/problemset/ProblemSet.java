package com.complexity.encounter.problemset;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
/**
 * This Java class instantiates objects which act as lists of Problems. Contains data for name, id, the number of
 * completed problems, and an array of integer ids which refer to Problem objects.
 * @Author Cole Gregory
 *
 */
public class ProblemSet
{
    @Id
    @GeneratedValue
    //The problem set id
    private Long id;
    //The problem set's name
    private String name;
    //Each problem set contains a list of problems accessible via an array of their ids
    private int[] problemList;
    //Each problem set will show the number of problems in the set the student has completed
    private int numCompleted;
}
