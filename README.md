# Instamint Project

## Overview

Instamint is an innovative social sharing platform specifically designed for NFT enthusiasts. By integrating the visual appeal of platforms like Instagram with cutting-edge Web3 technologies, Instamint offers a unique space for digital art creators and collectors to connect, share, and trade NFTs. Developed in response to a tender from a digital agency, Instamint aims to provide an immersive experience that enhances engagement within the digital art community.

## Project Objectives

- **Respond Effectively to the Tender:** Comprehensive analysis and strategic response to the tender requirements.
- **Strict Adherence to Project Schedule:** Development of a detailed schedule to guide project execution, with a strong commitment to meeting deadlines.
- **Efficient Team Management:** Active leadership and management of the development team through each project sprint.
- **Quality Assurance:** Implementation of rigorous quality control measures to ensure the highest standards of project delivery.
- **Compliance with Legal and Ethical Standards:** Ensuring all aspects of the project, especially data collection and storage, comply with relevant legal frameworks.
- **Outreach and Engagement:** Writing and publishing articles to chronicle the project development journey and engage the broader community.
- **Environmental Considerations:** Evaluation of the project's environmental impact, with strategies to mitigate negative effects.
- **Client Presentations:** Effective communication of project milestones and outcomes to the client.
- **Innovative User Experience:** Proposal and integration of UX innovations to enhance user interaction with the platform.

## Technologies

- **Programming Languages:** JavaScript
- **Web Framework:** React.js
- **Game Development Engine:** Unity
- **Blockchain Technology:** Ethereum
- **Cloud Services:** Microsoft Azure
- **Continuous Integration/Continuous Deployment:** GitHub Actions

## Deliverables

- **Mobile Application:** A user-friendly mobile app for accessing Instamint on the go.
- **Web Application:** A robust web platform for a comprehensive digital art and NFT trading experience.
- **Administration Interface:** A web-based admin interface for backend management.
- **Microservices-based Backend:** A scalable and maintainable backend architecture.
- **Tender Response Documentation:** Including forecast schedule and budget estimations.
- **Final Project Report:** Detailing the actual project timeline, ecological impact, quality assurance processes, and UX innovations.
- **Comprehensive Documentation:** Covering code, deployment, development environment, and user manual.
- **Technical Deployments:** Accessible at `GROUPNAME.instamint.fr`.
- **Project Presentation:** Engaging slides summarizing the project's scope, achievements, and impact.

## Project Setup and Launch

### Initial Setup

1. **Cloning the Repository:**
   - Use `git clone https://github.com/mouradof/instamint.git` to clone the project repository to your local machine.

### Preparing for Development

1. **Update Main Branch:**

   - Ensure you're on the main branch with `git checkout main` and then update it with `git pull`.

2. **Branch Creation:**

   - Follow the naming conventions for branches: `feature/`, `release/`, or `hotfix/`.
   - Create a new branch with `git checkout -b branch-name`.

3. **Committing Changes:**

   - After making changes, use `git add filename [filename ...]` and `git commit` to commit your changes.

4. **Pushing Changes:**

   - Push your changes with `git push branch-name`.

5. **Creating a Pull Request:**

   - Go to the GitHub repository, select your branch, and initiate a pull request with a descriptive title.

6. **Updating Pull Requests:**
   - Further changes can be pushed to the same branch, updating the existing pull request.

### Launching the Project

- **Docker Command:**
  - Execute `docker compose up -d --build` to build and start the project containers in detached mode.

### Accessing Project Interfaces

- **pgAdmin Interface:**

  - Accessible at `localhost:5050` for database management.
  - Use credentials `user: admin@admin.com` and `password: admin` for login.
  - To connect to the PostgreSQL database, create a server with the following details:
    - Host: `postgres-db`
    - User: `user`
    - Password: `password`
