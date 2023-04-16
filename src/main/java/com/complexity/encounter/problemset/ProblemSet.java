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
    //The ID of the classroom this problem set belongs to
    private Long classroomId;
    //Each problem set contains a list of problems accessible via an array of their ids
    private int[] problemList;
    // The type of set - (Practice, Quiz, or Assignment)
    private String type;
    // The date in which the problem set will be shown
    private String showDate;
    // The due date for the problem
    private String dueDate;
    // The visibility of the problem set:
    // (0: Enabled, 1: Disabled, 2: Based on date)
    private int visibility;
}
