package com.complexity.encounter.solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SolutionController {

    @Autowired
    private SolutionService solutionService;

    @RequestMapping("/solutions")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<com.complexity.encounter.solution.Solution> getAllSolutions(){
        return solutionService.getAllSolutions();
    }
    @RequestMapping("/solutions/{id}")
    public com.complexity.encounter.solution.Solution getSolution(@PathVariable long id){
        return solutionService.getSolutionById(id).get();
    }
    @RequestMapping("/solutions/student/{studentId}")
    public com.complexity.encounter.solution.Solution getSolutionByStudentId(@PathVariable long studentId){
        return solutionService.getSolutionByStudentId(studentId).get();
    }
    @RequestMapping("/solutions/problem/{problemId}")
    public com.complexity.encounter.solution.Solution getSolutionByProblemId(@PathVariable long problemId){
        return solutionService.getSolutionByProblemId(problemId).get();
    }
    @RequestMapping("/solutions/{studentId}/{problemId}")
    public com.complexity.encounter.solution.Solution getSolutionByProblemId(@PathVariable long studentId, @PathVariable long problemId){
        return solutionService.getSolutionByStudentAndProblem(studentId,problemId).get();
    }
    @RequestMapping(method= RequestMethod.POST, value="/solutions")
    public void addSolution(@RequestBody com.complexity.encounter.solution.Solution solution){
        solutionService.saveSolution(solution);
    }
    @RequestMapping(method= RequestMethod.PUT, value="/solution/{id}")
    public void updateSolution(@RequestBody Solution solution, @PathVariable long id) {
        solutionService.updateSolution(solution, id);
    }
    @RequestMapping(method= RequestMethod.DELETE, value="/solutions/{id}")
    public void deleteSolution(@PathVariable long id){
        solutionService.deleteSolution(id);
    }
}
