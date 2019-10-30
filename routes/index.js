var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const eventResponse = {"events":[
    {
      "id":5737077,
      "title":"CNC Guided Access",
      "start":"2019-10-30T13:00:00-06:00", "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737077"
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "color":"#5792FF"
    },
    {
      "id":5737154,
      "title":"Laser Cutting Guided Access",
      "start":"2019-10-30T13:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737154"
      },
      "seats":5,
      "registration":true,
      "seats_taken":5,
      "color":"#FF787D",
    },
    {
      "id":5736946,
      "title":"Shop 61: Guided Access",
      "start":"2019-10-30T13:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5736946",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "color":"#14C762",
    },
    {
      "id":5737107,
      "title":"CNC Guided Access",
      "allday":false,
      "start":"2019-10-30T14:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737107",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "color":"#5792FF",
    },
    {
      "id":5737178,
      "title":"Laser Cutting Guided Access",
      "start":"2019-10-30T14:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737178"
      },
      "seats":5,
      "registration":true,
      "seats_taken":5,
      "color":"#FF787D",
    },
    {
      "id":5737126,
      "title":"Shop 61: Guided Access",
      "start":"2019-10-30T14:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737126",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "color":"#14C762",
    },
    {
      "id":5737197,
      "title":"Laser Cutting Guided Access",
      "start":"2019-10-30T16:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737197",
      },
      "seats":5,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#FF787D",
    },
    {
      "id":5737254,
      "title":"Open Studio & Limited Shop Access",
      "start":"2019-10-30T16:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737254",
      },
      "seats":"",
      "registration":false,
      "color":"#60D1D1",
    },
    {
      "id":5737216,
      "title":"Laser Cutting Guided Access",
      "start":"2019-10-30T17:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737216",
      },
      "seats":5,
      "registration":true,
      "seats_taken":2,
      "wait_list":true,
      "color":"#FF787D",
    },
    {
      "id":5737291,
      "title":"CNC Guided Access",
      "start":"2019-11-02T10:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737291",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#5792FF",
    },
    {
      "id":5737272,
      "title":"Laser Cutting Guided Access",
      "start":"2019-11-02T10:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737272",
      },
      "seats":5,
      "registration":true,
      "seats_taken":3,
      "wait_list":true,
      "color":"#FF787D",
    },
    {
      "id":5737309,
      "title":"Open Studio & Limited Shop Access",
      "start":"2019-11-02T10:00:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737309",
      },
      "seats":"",
      "registration":false,
      "color":"#60D1D1",
    },
    {
      "id":5737300,
      "title":"CNC Guided Access",
      "start":"2019-11-02T11:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737300",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#5792FF",
    },
    {
      "id":5737280,
      "title":"Laser Cutting Guided Access",
      "start":"2019-11-02T11:30:00-06:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/5737280",
      },
      "seats":5,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#FF787D",
    },
    {
      "id":4739245,
      "title":"Sewing Rebellion Workshop",
      "start":"2019-11-03T14:30:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/4739245",
      },
      "seats":30,
      "registration":true,
      "seats_taken":15,
      "wait_list":true,
      "color":"#FFEE59",
    },
    {
      "id":6005143,
      "title":"CNC Guided Access",
      "start":"2019-11-05T13:00:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/6005143",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#5792FF",
    },
    {
      "id":6005199,
      "title":"Laser Cutting Guided Access",
      "start":"2019-11-05T13:00:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/6005199",
      },
      "seats":5,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#FF787D",
    },
    {
      "id":6005080,
      "title":"Shop 61: Guided Access",
      "start":"2019-11-05T13:00:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/6005080",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#14C762",
    },
    {
      "id":6005179,
      "title":"CNC Guided Access",
      "start":"2019-11-05T14:30:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/6005179",
      },
      "seats":1,
      "registration":true,
      "seats_taken":1,
      "wait_list":true,
      "color":"#5792FF",
    },
    {
      "id":6005284,
      "title":"Laser Cutting Guided Access",
      "start":"2019-11-05T14:30:00-07:00",
      "url":{
        "public":"https:\/\/calendar.boulderlibrary.org\/event\/6005284",
      },
      "seats":5,
      "registration":true,
      "seats_taken":2,
      "wait_list":true,
      "color":"#FF787D",
    },
  ]}

  const events = eventResponse.events

  res.render('index', {
    title: 'Express',
    events
  });
});

module.exports = router;
