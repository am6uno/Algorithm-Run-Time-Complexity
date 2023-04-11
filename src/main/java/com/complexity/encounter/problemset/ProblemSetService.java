package com.complexity.encounter.problemset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
/**
 * This is the service for the ProblemSet class.
 * @Author Cole Gregory
 */
public class ProblemSetService
{
    @Autowired
    private ProblemSetRepository problemSetRepository;

    public void saveProblemSet(ProblemSet set)
    {
        problemSetRepository.save(set);
    }
    public List<ProblemSet> getAllProblemSets()
    {
        return problemSetRepository.findAll();
    }
    public Optional<ProblemSet> getProblemSetById(long id)
    {
        return problemSetRepository.findById(id);
    }
    public void deleteProblemSet(long id)
    {
        problemSetRepository.deleteById(id);
    }
    public void updateProblemSet(ProblemSet set, Long id)
    {
        Optional<ProblemSet> updatedProblemSet = problemSetRepository.findById(id);
        updatedProblemSet.get().setName(set.getName());
        updatedProblemSet.get().setProblemList(set.getProblemList());
        updatedProblemSet.get().setNumCompleted(set.getNumCompleted());
        problemSetRepository.save(updatedProblemSet.get());
    }
}