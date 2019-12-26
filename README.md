# README

Mrrrrbe todos:

- [ ] Lists are ordered by time, then title (shop + cnc)
- [ ] User can drag csvs into any space in page
- [ ] If one of these sheets has a different day, mark that sheet filename with a sads after compile-click
- [ ] If a sheet has a different day, mark that sheet with sads upon drag-drop
- [ ] Some preparsing - filename is accompanied with date and event title on drag-drop
- [ ] you can remove a file before compiling (x)
- [ ] can you center a toast????

### Live site: http://bldg61cal.herokuapp.com/

### Local dev requirements:

1. [Node.js](https://nodejs.org/en/) - install perhaps via NVM or similar
1. [Yarn](https://yarnpkg.com/en/docs/install) - can install with homebrew or similar(or use npm, ships with Node.js)
1. [PostgreSQL](https://www.postgresql.org/download/) - can install with homebrew or similar

### Local dev setup:

1. fork, clone, yarn install
1. cp .env.example .env and update with libCal values
    * client id and secret: log into libcal as admin, go to admin -> api -> api authentication and create an app
    * events url: admin -> api -> endpoints (current v1.1) -> events and copy url with the calendar id, replace with your calendar's id
1. `createdb bldg61_development && createdb bldg61_test`
1. `yarn db:migrate && yarn db:migrate:test`
    * if you want to rollback or forward to a specific version, add an ENV with that specific timestamp, for example:
        ```
        MIGRATE_TO=20191223035122 yarn db:migrate
        ```
1. `yarn start`, or install nodemon locally and :sparkles: `nodemon start` :sparkles: (watches file changes and restarts server)
1. To add admin users:
    ```
    -> DATABASE_URL=postgres://localhost/bldg61_development node
    > const User = require('./models/user');
    > User.create({
      firstName: 'Luke',
      lastName: 'Bartel',
      email: 'luke@example.com',
      password: 'password',
      })
    ```
    This will return a pending promise, but a user will have been created in the database.

### Checking out the running server on other devices (must be on same wifi)

1. Get the running server computer's LOCAL ip address
    * Mac - Listed in System Preferences -> Network
1. Go to <local ip address>:<port number> on the other device(s)

### Docs for dependencies:

* [Selenium WebDriver](https://selenium.dev/selenium/docs/api/javascript/index.html)
