require("dotenv").config();
const port = 3000;
const express = require("express");
const app = express();
const connection = require("./conf");
const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// IMPORT JSON
const activitiesjson = require("./activities.json");
const json = require("./users.json");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// ACTIVITIES

app
  .get("/activities", (req, res) => {
    connection.query("SELECT * FROM activities", (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  })
  .get("/activities/sports/:sports_id", (req, res) => {
    const sportId = req.params.sports_id;
    connection.query(
      "SELECT activities.activity_id, activities.sport_id AS fk_sport_id, activities.creator_id, activities.activity_difficulty, activities.activity_description, activities.activity_adresse, activities.activity_city, activities.activity_latitude, activities.activity_longitude, activities.activity_start_time, activities.activity_duration, activities.activity_photo, activities.activity_max_participants, activities.activity_creation_time, sports.sport_id, sport_name FROM activities JOIN sports ON activities.sport_id = sports.sport_id WHERE sports.sport_id = ?",
      [sportId],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  })
  .get("/activities/creators/:creator_id", (req, res) => {
    const creatorId = req.params.creator_id;
    connection.query(
      "SELECT * FROM activities WHERE creator_id = ?",
      [creatorId],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.json(results);
        }
      }
    );
  })
  .get("/activities/city/:city", (req, res) => {
    const city = req.params.city;
    connection.query(
      "SELECT * FROM activities WHERE activity_city = ?",
      [city],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.json(results);
        }
      }
    );
  })
  .get("/activities/geolocalisation", (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    connection.query(
      "SELECT * FROM activities WHERE activity_latitude= ? AND activity_longitude = ?",
      [latitude, longitude],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.json(results);
        }
      }
    );
  })

  .post("/activities", (req, res) => {
    const formData = req.body;
    connection.query(
      "INSERT INTO activities SET ?",
      formData,
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  })
  .put("/activities/:activity_id", (req, res) => {
    const idActivity = req.params.activity_id;
    const formData = req.body;
    connection.query(
      "UPDATE activities SET ? WHERE id = ?",
      [formData, idActivity],
      err => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });

// USERS -- Liste utilisateurs

app.get("/users", (req, res) => {
  res.send(json.users);
});

// USERS -- créer un utilisateur

app.post("/users", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO users SET ?", formData, err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la création d'un utilisateur");
    } else {
      res.sendStatus(200);
    }
  });
});

// USERS -- afficher le profil d'un utilisateur

app.get("/users/:user_id", (req, res) => {
  const requiredProfile = json.users.filter(
    user => user.id === parseInt(req.params.user_id)
  );
  requiredProfile[0]
    ? res.send(`Your id : ${requiredProfile[0].firstname}`)
    : res.status(404).send(`There is no such user !`);
});

// USERS -- modifier le profil d'un utilisateur

app.put("/users/:id", (req, res) => {
  const idUser = req.params.id;
  const formData = req.body;
  connection.query(
    "UPDATE user SET ? WHERE id = ?",
    [formData, idUser],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un utilisateur");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// USERS -- TERMINE

app.listen(port, err => {
  if (err) {
    throw new Error("Something Bad Happened ...");
  }
  console.log(`server is listening on ${port}`);
});
