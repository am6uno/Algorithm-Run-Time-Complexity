package com.complexity.encounter.problem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @RequestMapping("/problems")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<Problem> getAllProblems(){
        return problemService.getAllProblems();
    }
    @RequestMapping("/problems/{id}")
    public Problem getProblem(@PathVariable long id){
        return problemService.getProblemById(id).get();
    }
    @RequestMapping(method= RequestMethod.POST, value="/problems")
    public void addProblem(@RequestBody Problem problem){
        problemService.saveProblem(problem);
    }
    @RequestMapping(method= RequestMethod.PUT, value="/problems/{id}")
    public void updateProblem(@RequestBody Problem problem, @PathVariable Long id) {
        problemService.updateProblem(problem, id);
    }
    @RequestMapping(method= RequestMethod.DELETE, value="/problems/{id}")
    public void deleteProblem(@PathVariable long id){
        problemService.deleteProblem(id);
    }
}
