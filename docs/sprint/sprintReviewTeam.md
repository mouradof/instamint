# Sprint Review

## Basic Information

- **Sprint:** 1
- **Review Date:** 04/21
- **Participants:** Haouili Yani

## Sprint Goals

- Have a profile page
- Retrieve a user's data to display on the profile page
- Allow modification of a user's data
- Delete a user

## Deliverables

### Completed Features

1. **Display the Profile Page**
   - **Description:** Display the profile page with data from a random user since the login token part was not available
2. **Modify User Data**
   - **Description:** Have an edit form and an API to modify a user's data
3. **User Deletion**
   - **Description:** Enable users to delete their accounts

### Unfinished Features

- **Account Deletion Verification via Email**
  - **Description:** Implementation of account deletion verification via email was not completed

## Challenges and Blockages

- **Challenges:**
  - Use hardcoded users because the login is done at the same time as the profile section
- **Blockages:**
  - Unable to perform my part with my TOKEN

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - Participants will discuss potential solutions to the encountered blockages, particularly regarding authentication and TOKEN management.

## Action Plan

- Resolve authentication issues to integrate TOKENs in the next phase of the project
- Implement account deletion verification via email in the next sprint

## Conclusion

- This sprint has established key functionalities for profile management while identifying significant challenges related to the integration of the authentication system. Future actions must target these challenges for improved project coherence.

---

# Sprint Review

## Basic Information

- **Sprint:** 1
- **Review Date:** 04/21
- **Participants:** HADJRES Mourad

## Sprint Goals

- Implement and refine the project's setup including Docker integration.
- Enhance the documentation to facilitate development and deployment.
- Establish a robust user management system including registration and authentication.
- Develop and integrate a Continuous Integration workflow.

## Deliverables

### Completed Features

1. **Project Setup and Dockerisation**

   - **Description:** Configured Docker for database, frontend, and admin db page. Added scripts for initializing users and tables for development purposes. Populated development database with fake data. Updated README and added Docker documentation.

2. **Documentation Enhancements**

   - **Description:** Added image mockups for UI concepts. Outlined the microservice architecture and system interactions through use case diagrams. Documented Docker setup and configurations and conducted a risk analysis for security and operational challenges.

3. **User Authentication Features**

   - **Description:** Implemented and tested user registration API with email verification. Added database migrations and seed data. Integrated SMTP service for email handling in Docker. Developed and tested user login and registration frontend interfaces.

4. **Continuous Integration (CI) Workflow**
   - **Description:** Configured a CI workflow in GitHub Actions for Docker, triggered on push and pull requests to branches. The workflow includes Docker build, security scanning with Trivy, and cleanup steps.

### Unfinished Features

- **Advanced Security Features for User Authentication**
  - **Description:** Further enhancements in security features and integration of more robust authentication mechanisms were planned but not completed.

## Challenges and Blockages

- **Challenges:**
  - Adapting Docker configurations to new service requirements and ensuring compatibility with existing codebase and tools like Knex.
- **Blockages:**
  - Some issues with environment-specific settings in Docker causing delays in CI workflow stability.

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - Participants will discuss the effectiveness of Docker integration and the CI/CD pipeline. Feedback on documentation clarity and the need for additional security measures in user authentication will be addressed.

## Action Plan

- Continue refining Docker setups to ensure environment-specific configurations are robust and flexible.
- Expand security features in the user authentication process.
- Address any pending CI/CD pipeline issues to enhance deployment efficiency.

## Conclusion

- The sprint successfully enhanced project setup, documentation, and user authentication features, laying a solid foundation for further development. The introduction of a CI workflow marks a significant step towards ensuring code quality and security, setting the stage for future enhancements.

---

# Sprint Review

## Basic Information

- **Sprint:** 1
- **Review Date:** 04/21
- **Participants:** SYLLA Aboubakar

## Sprint Goals

- Create a news feed
- Implement content publishing page

## Deliverables

### Completed Features

-

### Unfinished Features

- **Create a news feed**
  - **Description:** As a user, I want to be able to navigate easily to the different sections of the site from the home page, to access features quickly.

## Challenges and Blockages

- **Challenges:**
  - Having no real back-end experience, my challenge was to implement a back-end feature from A to Z.
- **Blockages:**
  - Make the BackEnd - FrontEnd connection, install and understand how the project works properly
  - I had problems with NextJs

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - Participants will discuss potential solutions to the encountered blockages, particularly regarding how micro-service works and its subtleties.

## Action Plan

- Resolve authentication issues to integrate TOKENs in the next phase of the project
- Solve these back-end, front-end connection problems

## Conclusion

- I wasted a lot of time understanding how the project works and really getting down to work. I also took time on the back part of my US.
  Normally, I'll be able to manage my time better during the next sprint and get the work done on time.

---

# Sprint 2

## Basic Information

- **Sprint:** 2
- **Review Date:** 05/20
- **Participants:** HADJRES Mourad

## Sprint Goals

- Fix all Docker-related issues.
- Update and add another Makefile, fixing problems when launching migration and API with the same host.
- Update middleware for hono signature.
- Redirect to login when email is confirmed.
- Style login and register pages.
- Add restrictions for password and email.
- Create an introduction for launching the app.
- Add CI, running app containers, execute linter, and prepare for adding tests for the backend.
- Change DockerFile, add MakeFile, update scripts in package.json, Knex config, and simplify migrations.
- Add a general script in Makefile to launch the app (containers, migrations, seed) with one command ('make run').
- Fix header and footer on all pages, adjust HomePage height.
- Add search functionality for both front and back end.

## Deliverables

### Completed Features

1. **Fix Docker Problems**
   - **Description:** Resolved all issues related to Docker configuration and setup.
2. **API User Update**
   - **Description:** Updated and added a new Makefile, fixed migration and API host issues, updated middleware, added redirection after email confirmation, styled login and register pages, added password and email restrictions, and created an introduction for launching the app.
3. **Continuous Integration**
   - **Description:** Implemented CI, running app containers, executing linter, and prepared backend tests.
4. **API Post and Update**
   - **Description:** Updated DockerFile, added MakeFile, updated package.json scripts, Knex config, and simplified migrations. Added a general script in Makefile for launching the app, fixed headers and footers on all pages, and adjusted HomePage height.
5. **Search Functionality**
   - **Description:** Added search functionality for both front and back end.

### Unfinished Features

- **Advanced Security Features for User Authentication**
  - **Description:** Further enhancements in security features and integration of more robust authentication mechanisms were planned but not completed.

## Challenges and Blockages

- **Challenges:**
  - Adapting Docker configurations to new service requirements and ensuring compatibility with existing codebase and tools like Knex.
- **Blockages:**
  - Some issues with environment-specific settings in Docker causing delays in CI workflow stability.

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - Participants will discuss the effectiveness of Docker integration and the CI/CD pipeline. Feedback on documentation clarity and the need for additional security measures in user authentication will be addressed.

## Action Plan

- Continue refining Docker setups to ensure environment-specific configurations are robust and flexible.
- Expand security features in the user authentication process.
- Address any pending CI/CD pipeline issues to enhance deployment efficiency.

## Conclusion

- The sprint successfully enhanced project setup, documentation, and user authentication features, laying a solid foundation for further development. The introduction of a CI workflow marks a significant step towards ensuring code quality and security, setting the stage for future enhancements.

---

# Sprint 2

## Basic Information

- **Sprint:** 2
- **Review Date:** 20/05/2024
- **Participants:** Yani Haouili

## Sprint Goals

- Improve session management and user experience on the profile page
- Enhance security features related to user sessions and data management
- Introduce new profile customization options

## Deliverables

### Completed Features

1. **Session Management Enhancements**
   - **Description:** Implemented persistent sessions to maintain user connectivity even after refreshing the page. Included logout functionalities to securely disconnect users.
2. **Profile Page Improvements**
   - **Description:** Updated the profile page with fixes and style adjustments for a better user experience. Added functionalities to display user posts and manage profile editing more effectively.
3. **Profile Deletion and Editing**
   - **Description:** Introduced a feature for automatic profile deletion after 30 days of inactivity to maintain database integrity. Enhanced the profile editing process to be more user-friendly.
4. **Customization Options**
   - **Description:** Provided options for users to choose either a default or random profile and cover photos, allowing for greater personalization.

### Unfinished Features

- **Profile and Cover Photo Selection**
  - **Description:** The full integration of the profile and cover photo selection feature is still in progress and needs to be completed in the next sprint.

## Challenges and Blockages

- **Challenges:**
  - Implementing comprehensive session management that remains stable across different user actions and page refreshes.
- **Blockages:**
  - Delays in API availability hindered progress on features related to post management on user profiles.

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - The participants reviewed the improvements made in session stability and user interface enhancements. Discussion also covered the delays caused by API availability issues, affecting timely feature completions.

## Action Plan

- Finalize the integration of profile and cover photo selections to ensure all profile customization features are functional.
- Continue to improve the backend APIs to support stable and efficient data retrieval and management for user profiles.

## Conclusion

- The second sprint focused on refining user interaction with the profile page and enhancing security and personalization features. While significant progress was made, the need to address API availability and complete pending features remains a priority for the next sprint.
