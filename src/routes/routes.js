const Router = require("express");
const firebase = require("firebase-admin");

const route = Router();

// Firebase
const serviceAccount = require("../public/todo-f9757-firebase-adminsdk-ahnhx-99ba117ea3.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://todo-f9757.firebaseio.com/",
});

const db = firebase.database();

route.get("/", (req, res) => {
  db.ref("tasks").once("value", (snapshot) => {
    const data = snapshot.val();
    res.render("index", { tasks: data });
    // console.log(data);
  });
});

route.post("/add", (req, res) => {
  console.log(req.body.inputTask);
  const newTask = req.body.inputTask;
  db.ref("tasks").push(newTask);
  res.redirect("/");
});

route.get("/delete-task/:id", (req, res) => {
  db.ref("tasks/" + req.params.id).remove();
  res.redirect("/");
});

module.exports = route;
