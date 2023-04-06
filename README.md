# Algorithm-Run-Time-Complexity

- **Project explanation:** 
  - We aim to create an online web application which emphasizes an interesting presentation to appeal to students, interactivity, and understandable feedback. This webpage will allow teachers to upload programs/code snippets. The teachers will then go on to annotate line by line the time complexity of each program. Students will then go in and annotate the programs. The students' annotations will be compared with the teachers' annotations and feedback will be provided on which lines the student has annotated incorrectly.

- **Release notes:**
  - **Milestone 3 (4/05/2023)**
    - Added Keycloak to handle login and account creation.
    - Added the ability for students to enter solutions to problems.
    - Added the parser. The parser is used to auto fill annotations and hints for the teacher when they are filling out problems.
      The parser is also used to color different blocks when the students are solving the problems.
    - Created the student service and classroom service and updated the teacher service.
    
  - **Milestone 2 (3/22/2023)**
    - Added the ability for teachers to create problems on the front end.
    - Added the login/create account HTML and CSS (the logic is not setup yet).
    - Setup the documentation for both frontend(Compodocs) and backend(Javadoc).
    - Added jest tests to cover the code that allows teachers to create problems.
    - Added the teacher service and solution service in the backend.
    - Finalized our data model.

  - **Milestone 1 (3/1/2023)**
    - Created frontend Angular application
    - Created backend Spring application
    - Created a UI that shows where the Teacher will login, and how students will find or search for problems 
    - Created a Problem Service to handle CRUD operations for Problems
    - Added in frontend tests for UI components
    
