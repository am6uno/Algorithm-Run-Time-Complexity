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
    @RequestMapping(method= RequestMethod.POST, value="/solutions")
    public void addSolution(@RequestBody com.complexity.encounter.solution.Solution solution){
        solutionService.saveSolution(solution);
    }
    /*@RequestMapping(method= RequestMethod.PUT, value="/solution/{id}")
    public void updateSolution(@RequestBody Solution solution, @PathVariable Long id) {
        solution.updateSolution(solution, id);
    }*/
    @RequestMapping(method= RequestMethod.DELETE, value="/solutions/{id}")
    public void deleteSolution(@PathVariable long id){
        solutionService.deleteSolution(id);
    }
}
