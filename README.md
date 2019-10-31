# README

### Live site: http://bldg61cal.herokuapp.com/

### Local dev setup:

1. fork, clone, yarn install
1. cp .env.example .env and update with libCal values
    * client id and secret: log into libcal as admin, go to admin -> api -> api authentication and create an app
    * events url: admin -> api -> endpoints (current v1.1) -> events and copy url with the calendar id, replace with your calendar's id
1. yarn start, or install nodemon locally and nodemon start (watches file changes and restarts server)