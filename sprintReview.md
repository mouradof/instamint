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
  - Make the backEnd - frontEnd connection, install and understand how the project works properly
  - I had problems with NextJs

## Feedback and Discussion

- **General Discussion on Achievements and Challenges**
  - Participants will discuss potential solutions to the encountered blockages, particularly regarding How micro-service works and its subtleties

## Action Plan

- Resolve authentication issues to integrate TOKENs in the next phase of the project
- Solve these back-end, front-end connection problems

## Conclusion

- I wasted a lot of time understanding how the project works and really getting down to work. I also took time on the back part of my US.
  Normally, I'll be able to manage my time better during the next sprint and get the work done on time.

---
