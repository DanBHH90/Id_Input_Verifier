const clc = require("cli-color");
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const mongoose = require("mongoose");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Die App ist erreichbar unter localhost:3000');
});


  function User(){

    this.UserID = 'PA-' + Math.round(Math.random() * 10 * 10 * 10 * 10 * 100 * 100);
    this.Age = Math.floor(Math.random() * 101);;
    this.Level = Math.floor(Math.random() * 101);;
    this.Production = Math.floor(Math.random() * 1001);;
    this.TotalProd = Math.floor(Math.random() * 1201);;

  }

  var myUserID;
  var arr = [];

  function maker(n) {

    while (n > 0) {
      arr.push(new User(n));
      n--;
    }
    return arr;

  }

  maker(10);

  console.log("                                                      ");
  console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - -  ");
  console.log(" - ID's, die zu Testzwecken verwendet werden können - ");
  console.log(" - - - - - - - - - - - - - - - - - - - - - - - - - -  ");
  console.log("                                                      ");

  for (let i = 0; i < arr.length; i++) {

    var a = arr[i].UserID;
    var numbers = [];
    var id = a.substring(3);
    numbers.push(id);
    console.log(numbers);

  }


io.on('connection', (socket) => {

  socket.on("myUserID", (Id) => {

    var exists = 0;

    myUserID = Id;

    if(!Id) {
      socket.emit('IsEmtpy', Id);
    }

    if(Id.length < 8) {
      socket.emit('TooShort', Id);
    }

    for (let i = 0; i < arr.length; i++) {

      var a = arr[i].UserID;
      var numbers = [];
      var id = a.substring(3);
      numbers.push(id);

      console.log(numbers);

      if(myUserID == id) {

        console.log(clc.red("ID ist bereits vorhanden in der Datenbank"));
        socket.emit('IDexists', arr[i]);

      }

    }

  });

});