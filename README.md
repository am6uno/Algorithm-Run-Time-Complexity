# Algorithm-Run-Time-Complexity

- **Project explanation:** 
  - We aim to create an online web application which emphasizes an interesting presentation to appeal to students, interactivity, and understandable feedback. This webpage will allow teachers to upload programs/code snippets. The teachers will then go on to annotate line by line the time complexity of each program. Students will then go in and annotate the programs. The students' annotations will be compared with the teachers' annotations and feedback will be provided on which lines the student has annotated incorrectly.

- **Release notes:**
  - **Milestone 5 (5/12/2023)**
    - Completed the problem set page. This is a page for students to view the problem sets and problems within that set for a classroom. From this page students can select problems to complete.
    - Completed the teacher classroom page. The page shows teacher a list of their classroom and allows them to create classroom, delete classroom, and remove students from classrooms.
    - Created a student classroom page. Students can see the classes they are enrolled in and navigate to the problem sets for the class.
    - Created a page for students to enroll in classes.
    - Added a modal for selecting the problem set that a problem will go into.
    - Rewrote the student class to ensure proper synchronization with classrooms and added methods to retrieve the classrooms in which a student is enrolled. This allows for displaying the student's classrooms on the student classrooms page.
    - Added a CORS configuration.
    - Deployed our application on AWS.
    - Added documentation to all of our code.

  - **Milestone 4 (4/19/2023)**
    - Updated the login process to include a screen for the user to pick their role and for students to enter their classroom code.
    - Added a page to manage sets. Teachers can create, update and delete sets from this page.
    - Added a page to manage problems within a set. Teachers can create problems to add to the set or add exisiting problems to the set. Problems can be updated and deleted from this page as well.
    - Two branches were close to getting merged in but we ran out of time. These branches will be merged in soon. A description of the branches can be found below.
    
    *Additional branches*
    * classroom: This branch deals with the management of classrooms.
    * problem-set: This will be a replacement for our problem selection page. The problems will be shown within their sets.

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
    
