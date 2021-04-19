require('dotenv').config();
const express = require('express');
const cors = require('cors');
const monk = require('monk');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cors());

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => console.log(error.message));

app.use(express.json());
//const http = require('http').createServer(app);
const db = monk(process.env.CONNECTION_URL);
const recordsCollection = db.collection('records');

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/get-a-list-of-records', (req, res) => {
  recordsCollection.find({}, (err, data) => {
    if (err) {
      res.json({ err: err });
    } else {
      res.json({ people: data });
    }
  });
});

app.post('/create-record', (req, res) => {
  const registerData = {
    name: req.body.name,
    surname: req.body.surname,
    country: req.body.country,
    birthday: req.body.birthday,
    pass: req.body.password,
    confirmPass: req.body.confirmPassword,
  };

  if (registerData.pass !== registerData.confirmPass) {
    res.json({ error: "Password and confirm password don't match." });
  } else {
    bcrypt.hash(registerData.pass, saltRounds, (error, hash) => {
      if (error) {
        console.log('Something went wrong.');
      } else {
        registerData.pass = hash;
        registerData.confirmPass = hash;
        recordsCollection
          .find({ name: req.body.name, surname: req.body.surname }, (error) => {
            if (error) {
              res.json({ error: error });
            }
          })
          .then((data) => {
            if (data.length === 0) {
              recordsCollection.insert(registerData);
              res.json({ message: 'Data inserted in db' });
            } else {
              res.json({ message: 'You were already registered.' });
            }
          });
      }
    });
  }
});

app.delete('/delete-record', (req, res) => {
  recordsCollection
    .find(
      {
        name: req.body.nameToDeleteOrEdit,
        surname: req.body.surnameToDeleteOrEdit,
      },
      (error) => {
        if (error) {
          res.json({ error: error });
        }
      },
    )
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(
          req.body.passwordToDeleteOrEdit,
          data[0]['pass'],
          (error, result) => {
            if (error) {
              res.json({ error: error });
            }
            if (result) {
              recordsCollection.remove({
                name: req.body.nameToDeleteOrEdit,
                surname: req.body.surnameToDeleteOrEdit,
              });
              res.json({ success: 'You successfully deleted your entry' });
            } else {
              res.json({
                unauthorized:
                  'You cannot delete this entry. Please check if inserted data is correct.',
              });
            }
          },
        );
      } else {
        res.json({ message: 'User not found. Please confirm inserted data.' });
      }
    });
});

app.put('/update-record', (req, res) => {
  let changedName, changedSurname, changedBirthday, changedCountry;
  recordsCollection
    .find(
      {
        name: req.body.selectedUserName,
        surname: req.body.selectedUserSurname,
      },
      (error) => {
        if (error) {
          res.json({ error: error });
        }
      },
    )
    .then((data) => {
      if (data.length > 0) {
        bcrypt.compare(req.body.password, data[0]['pass'], (error, result) => {
          if (error) {
            res.json({ error: error });
          }
          if (result) {
            if (req.body.name.length > 0) {
              changedName = req.body.name;
              recordsCollection.update(
                {
                  name: req.body.selectedUserName,
                  surname: req.body.selectedUserSurname,
                },
                { $set: { name: changedName } },
              );
            }
            if (req.body.surname.length > 0) {
              changedSurname = req.body.surname;
              recordsCollection.update(
                {
                  name: req.body.selectedUserName,
                  surname: req.body.selectedUserSurname,
                },
                { $set: { surname: changedSurname } },
              );
            }
            if (req.body.birthday.length > 0) {
              changedBirthday = req.body.birthday;
              recordsCollection.update(
                {
                  name: req.body.selectedUserName,
                  surname: req.body.selectedUserSurname,
                },
                { $set: { birthday: changedBirthday } },
              );
            }

            if (req.body.country.length > 0) {
              changedCountry = req.body.country;
              recordsCollection.update(
                {
                  name: req.body.selectedUserName,
                  surname: req.body.selectedUserSurname,
                },
                { $set: { country: changedCountry } },
              );
            }

            res.json({ success: 'You successfully edited your entry' });
          } else {
            res.json({
              unauthorized:
                'You cannot edit this entry. Please check if inserted password is correct.',
            });
          }
        });
      } else {
        res.json({ message: 'User not found. Please confirm inserted data.' });
      }
    });
});

/*
http.listen(5000, () => {
  console.log('listening on *:5000');
});
*/
