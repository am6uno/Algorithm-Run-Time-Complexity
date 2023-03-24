package com.complexity.encounter.problem;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProblemController.class)
@ExtendWith(SpringExtension.class)
class ProblemControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private ProblemService problemService;
    @Autowired
    private ObjectMapper objectMapper;
    ProblemController problemController = new ProblemController();
    Problem testProblem1 = new Problem(
            100,
            200,
            "For Loop Analysis",
            new String[]{"for (int i = 0; i < 2; i++) {", "// Do something", "}"},
            new String[]{"o(n)", "o(1)", "o(1)"},
            new String[]{"The progression here is linear.", "The execution here is constant.",
                    "The execution here is constant."},
            3);

    Problem testProblem2 = new Problem(
            101,
            201,
            "While Analysis",
            new String[]{"while (true) {", "// Do something", "}"},
            new String[]{"o(?)", "o(1)", "o(1)"},
            new String[]{"The progression here is unknown.", "The execution here is constant.",
                    "The execution here is constant."},
            7);

    Problem testProblem3 = new Problem(
            102,
            202,
            "Simple Analysis",
            new String[]{"int x = 0;", "int y = 1;", "int z = 2;"},
            new String[]{"o(1)", "o(1)", "o(1)"},
            new String[]{"The progression here is constant.", "The execution here is constant.",
                    "The execution here is constant."},
            5);

    @Test
    void getAllProblems() throws Exception {

        List<Problem> testProblems = new ArrayList<>(Arrays.asList(testProblem1, testProblem2, testProblem3));

        // Sets what should be returned when a mock GET request of all problems is executed
        when(problemService
                .getAllProblems())
                .thenReturn(testProblems);

        // Prints info, expects a status of 200 (OK), checks that list contains 3 objects,
        // and verifies that the response equals the object as a JSON string
        mockMvc.perform(get("/problems"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(3)))
                .andExpect(content().string(equalTo(objectMapper.writeValueAsString(testProblems))));
    }

    @Test
    void getProblem() throws Exception {

        // Sets what should be returned when a mock GET request of 100 is executed
        when(problemService
                .getProblemById(100))
                .thenReturn(Optional.ofNullable(testProblem1));

        // Prints info, expects a status of 200 (OK), and verifies that the response equals the object as a JSON string
        mockMvc.perform(get("/problems/100"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo(objectMapper.writeValueAsString(testProblem1))));
    }

    @Test
    public void addProblem() throws Exception {

        // Sets what should be returned when a mock POST request is executed. any() is used initially so that
        // saveProblem expects any argument
        doNothing().when(problemService).saveProblem(any());
        //when(problemService.saveProblem(any()));
        problemService.saveProblem(testProblem1);

        // Setting up the mock POST request
        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/problems")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testProblem1));

        mockMvc.perform(mockRequest)
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(equalTo(objectMapper.writeValueAsString(testProblem1))));

        /*
        RequestBuilder request = get("/api/problems");
        MvcResult result = mockMvc.perform(request).andReturn();
        System.out.println(result.getResponse().getContentAsString());
        */
        /*
        given(problemService.saveProblem(ArgumentMatchers.any())).willAnswer(invocation -> invocation.getArgument(0));

        ResultActions response = mockMvc.perform(post("/api/problems")
                .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testProblem)));

        response.andExpect(MockMvcResultMatchers.status().isCreated());

         */
    }

    @Test
    void updateProblem() {
    }

    @Test
    void deleteProblem() {
    }
}