Bien sûr, voici une version avec plus d'emojis :

# Instamint

## Description
Instamint is a social sharing platform dedicated to NFTs, blending the essence of Instagram with web3 technologies. This project was developed as part of a tender for a digital agency, with the aim of creating an immersive experience for digital art and NFT enthusiasts.

## Objectives
- **Analyze the tender and respond to it** 📝
- **Establish a schedule and stick to it** 🗓️
- **Manage the team during each sprint** 🏃‍♂️
- **Ensure project quality assurance** ✅
- **Adhere to legal framework, especially regarding data collection** ⚖️
- **Write articles on the project's development** 📰
- **Assess the ecological impact of the solution** 🌍
- **Present the work completed to the client** 🎤
- **Propose UX innovations to the client** 💡

## Technologies Used
- **Languages:** JavaScript
- **Frameworks:** React.js, Unity
- **Blockchain:** Ethereum
- **Cloud:** Microsoft Azure
- **CI/CD:** GitHub Actions

## Deliverables
- Mobile application 📱
- Web application 🌐
- Administration web interface 🖥️
- Backend structured in micro-services 🛠️
- Response to the tender with forecast schedule and estimations 📊
- Final report with actual schedule, ecological risk assessment, quality process, UX innovation proposals 📑
- Code documentation, deployment process, development environment, user manual 📚
- Technical deliverables deployed on GROUPNAME.instamint.fr 🚀
- Project presentation slides 📊

## Instamint Workflow

### *Cloning and Forking the Repository*

<ins>**1 - Clone the repository**</ins>

Click the green "Code" button, copy the URL, and run:

`git clone https://github.com/mouradof/instamint.git`

## *Making Changes*

<ins>**1 - Update main**</ins>

Before making any changes, first checkout main.

`git checkout main`

and pull in the latest changes

`git pull`

This ensures your changes are against the latest main.

<ins>**2 - Create a branch**</ins>

Branch creation must adhere to the following conventions:

    - Feature: Refers to all functionalities, new functions, major refactorings.
    - Release: When enough features have accumulated or the next release time frame approaches, a new release branch is branched off of developing, solely dedicated to testing/bug fixing and cleanup.
    - Hotfix: Refers to a major problem found after release; the fix is developed in a hotfix branch, branched off of main. These are the only branches that will branch off of main.

Branch names could look like this:

    - feature/.....
    - release/.....
    - hotfix/.....

To create the branch, run:

`git checkout -b branch-name`

> (replace branch-name with your chosen branch name).

You can verify this with:

`git status`

<ins>**3 - Make your changes and commit them**</ins>

Once you've created your branch, make your changes and commit them.
Each commit should represent a single unit of change.
Also, write helpful commit messages, so someone can understand the commit's purpose from the message without needing to read the diff.

This might look like:

`git add filename [filename ...]`
`git commit`

> This will open an editor for your commit message.

<ins>**4 - Push up your changes**</ins>

Push your changes by running:

`git push branch-name`

> (replace branch-name with the branch name).

<ins>**5 - Make a pull request**</ins>

Go to the repository, select the branch from the branch popup, and click the pull request button.

Once done, you'll see a page displaying the changes' diff. Double-check them to ensure you're making a pull request against the correct branch.

Enter a descriptive title in the title field. This is crucial as it will show up in the pull request listing and email notifications to the repo's contributors.

Once done, click the "create pull request" button.

<ins>**6 - Pushing additional changes**</ins>

After creating the pull request, it may need reviewing with additional fixes. Don't create a new pull request. Instead, make more commits to your branch and push them up.

🚀 Happy coding! 🛠️
