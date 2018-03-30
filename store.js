'use strict';

/* global $ */

// eslint-disable-next-line no-unused-vars

const express = require('express');
const app = express();

const data = [
  {
    id: 1,
    title: 'google maps',
    link: 'https://www.google.com/maps',
    description: 'mapquest, but better',
    rating: '5',
    expanded: false
  }
];

app.get('/', function(req, res) {
  res.json(data);
});


module.exports = app;

// const store = (function() {
//   [
//     {
//       id: 1,
//       title: 'google maps',
//       link: 'https://www.google.com/maps',
//       description: 'mapquest, but better',
//       rating: '5',
//       expanded: false
//     }

//   ];

//   return {
//     list:[],
//     expanded: false

//   };

// });