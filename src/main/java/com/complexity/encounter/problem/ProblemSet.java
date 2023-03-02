package com.complexity.encounter.problem;
import java.util.ArrayList;
import java.lang.String;

public class ProblemSet 
{
	//The problem set id
	private long id;
	//The problem set's name
	private String name;
	//Each problem set contains a list of problems accessible via an arraylist
	private ArrayList<Problem> problemList = new ArrayList<Problem>();
	//Each problem set will show the number of problems in the set the student has completed
	private int numCompleted;
}
