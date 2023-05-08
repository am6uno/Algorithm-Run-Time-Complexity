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

    /**
     * Provides a get request for all Solutions from the solution service
     * @return the list of all Solutions
     */
    @RequestMapping("/solutions")
    public List<Solution> getAllSolutions(){
        return solutionService.getAllSolutions();
    }

    /**
     * Provides a get request for a single Solution by id
     * @param id - the Solution's id
     * @return the get request for the Solution
     */
    @RequestMapping("/solutions/{id}")
    public Solution getSolution(@PathVariable long id){
        return solutionService.getSolutionById(id).get();
    }

    /**
     * Provides a get request for all Solutions associated with a Student's id
     * @param studentId - the student id
     * @return the get request for the Solutions
     */
    @RequestMapping("/solutions/student/{studentId}")
    public List<Solution> getSolutionsByStudentId(@PathVariable long studentId){
        return solutionService.getSolutionsByStudentId(studentId);
    }

    /**
     * Provides a get request for Solutions by a Problem id
     * @param problemId - the Problem's id
     * @return the get request for the Solutions
     */
    @RequestMapping("/solutions/problem/{problemId}")
    public List<Solution> getSolutionsByProblemId(@PathVariable long problemId){
        return solutionService.getSolutionsByProblemId(problemId);
    }

    /**
     * Provides get request for a Solution by a Student's id and a Problem's id
     * @param studentId - the Student's id
     * @param problemId - the Problem's id
     * @return the get request for the Solution
     */
    @RequestMapping("/solutions/{studentId}/{problemId}")
    public Optional<Solution> getSolutionByStudentAndProblem(@PathVariable long studentId, @PathVariable long problemId){
        return solutionService.getSolutionByStudentAndProblem(studentId,problemId);
    }

    /**
     * Adds a Solution via the Solution service
     * @param solution - the Solution object to be added
     */
    @CrossOrigin(origins ="http://localhost:4200")
    @RequestMapping(method= RequestMethod.POST, value="/solutions")
    public void addSolution(@RequestBody Solution solution){
        solutionService.saveSolution(solution);
    }

    /**
     * Updates a solution
     * @param solution - the Solution object with the new data
     * @param id - the id of the Solution being updated
     */
    @RequestMapping(method= RequestMethod.PUT, value="/solution/{id}")
    public void updateSolution(@RequestBody Solution solution, @PathVariable Long id) {
        solutionService.updateSolution(solution, id);
    }

    /**
     * Deletes a solution
     * @param id - the id of the Solution being deleted.
     */
    @RequestMapping(method= RequestMethod.DELETE, value="/solutions/{id}")
    public void deleteSolution(@PathVariable long id){
        solutionService.deleteSolution(id);
    }
}
