# taf-report-portal-playwright
Test Automation Framework for Automated Testing Global Mentoring Program - Advanced

**Follow the instructions:**

1. Download and install Docker (use Personal free subscription)
2. Set up Report Portal container with Docker (instruction for [Windows](https://reportportal.io/docs/installation-steps/DeployWithDockerOnWindows/) / for [Mac](https://reportportal.io/docs/installation-steps/DeployWithDockerOnLinuxMac/))

**Running Report Portal Locally:**

`cd ~/reportportal`

`docker-compose -p reportportal up -d --force-recreate`

**Installing Dependencies**

`npm install`

create the .env file ".env.${YOUR_ENV}" following the .env-EXAMPLE

**Running Report Portal Web:**

Playwright allow us to skip login during test execution.
To do so , pleade run the command:

`npm run save:auth`

Follow the Login Steps by your EPAM credentials

**Running tests:**

option 1: **Playwright Test Runner**

This Test Automation Framework uses @playwright/Test as a default test runner, to see more documentation about please visit [Playwright Test](https://playwright.dev/docs/running-tests#command-line)

run the command:

`npm run test`

**parallelized:**

`npm run test:parallel`

option 2: **Vitest Test Runner**

As an alternative this Test Automation Framework offers Vitest as an optional Test Runner, for more information please visit [Vitest](https://vitest.dev/guide/)

run the command:

`npm run vitest`

note: Vitest is more utilized for running tests while performing changes into the code.

**parallelized:**

`npm run vitest:parallel`

note: Right Now running parallelized tests with Vitest is unstable.

To exit this continue running press q