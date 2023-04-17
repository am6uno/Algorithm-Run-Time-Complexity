package com.complexity.encounter.solution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
* This controller handles request for Solution objects.
*/

@RestController
@CrossOrigin(origins ="http://localhost:4200")
public class SolutionController {

    @Autowired
    private SolutionService solutionService;

    @RequestMapping("/solutions")
    @CrossOrigin(origins ="http://localhost:4200")
    public List<Solution> getAllSolutions(){
        return solutionService.getAllSolutions();
    }
    @RequestMapping("/solutions/{id}")
    public Solution getSolution(@PathVariable long id){
        return solutionService.getSolutionById(id).get();
    }
    @RequestMapping("/solutions/student/{studentId}")
    public List<Solution> getSolutionsByStudentId(@PathVariable long studentId){
        return solutionService.getSolutionsByStudentId(studentId);
    }
    @RequestMapping("/solutions/problem/{problemId}")
    public List<Solution> getSolutionsByProblemId(@PathVariable long problemId){
        return solutionService.getSolutionsByProblemId(problemId);
    }
    @RequestMapping("/solutions/{studentId}/{problemId}")
    public Optional<Solution> getSolutionByStudentAndProblem(@PathVariable long studentId, @PathVariable long problemId){
        return solutionService.getSolutionByStudentAndProblem(studentId,problemId);
    }
    @CrossOrigin(origins ="http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/solutions")
    public void addSolution(@RequestBody Solution solution){
        solutionService.saveSolution(solution);
    }
    @RequestMapping(method= RequestMethod.PUT, value="/solution/{id}")
    public void updateSolution(@RequestBody Solution solution, @PathVariable Long id) {
        solutionService.updateSolution(solution, id);
    }
    @RequestMapping(method= RequestMethod.DELETE, value="/solutions/{id}")
    public void deleteSolution(@PathVariable long id){
        solutionService.deleteSolution(id);
    }
}
