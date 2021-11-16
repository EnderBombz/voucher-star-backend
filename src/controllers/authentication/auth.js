const db = require("../../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../schema/schemas");

require("dotenv").config();

exports.auth = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  /*const user = {
        id: 1,
        name: "Gabriel Martani",
        company: 'Fatec',
        website: 'https://github.com/EnderBombz',
    }*/
  console.log(email, password);
  if (!email || !password) {
    res.send({ message: "Preencha todos os campos", status: 400 });
  }

  let validate_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  console.log(validate_email.test(email));

  if (!validate_email.test(email)) {
    res.send({ message: "Informe um email válido", status: 400 });
  } else {
    const account = await User.findOne({ email: email });
    console.log(account);

    if (account) {
      const saltRounds = 10;
      bcrypt.hash(account.password, saltRounds, function (err, hash) {
        // Salt + Hash
        bcrypt.compare(password, account.password, function (err, result) {
          // Compare

          console.log(result);
          // if passwords match
          const payload = JSON.stringify(account);

          if (result) {
            return res.json({
              payload,
              token: jwt.sign(payload, process.env.JWT_PASSWORD)
            });
          }

          // if passwords do not match
          else {
            res.send({ message: "Senha ou email incorreto", status: 400 });
          }
        });
      });
    } else {
      res.send({ message: "Dados incorretos", status: 404 });
    }
  }
};

exports.users = (req, res) => {
  return res.json([
    {
      id: 1,
      name: "Gabriel Martani",
      company: "Fatec",
      website: "https://github.com/EnderBombz"
    },
    {
      id: 2,
      name: "Giovanna Martani",
      company: "Shark",
      website: "https://github.com/EnderBombz"
    },
    {
      id: 3,
      name: "Giuliano Martani",
      company: "Heineken",
      website: "https://github.com/EnderBombz"
    },
    {
      id: 4,
      name: "Kátia Martani",
      company: "Delicias da Ka",
      website: "https://github.com/EnderBombz"
    }
  ]);
};
