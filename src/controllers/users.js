const { User } = require("../schema/schemas");
const bcrypt = require("bcrypt");
const { createCanvas, loadImage } = require("canvas");
const path = require("path");

exports.getAll = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    throw err;
  }
};
exports.getByName = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.find({ userName: userName });
    res.send(user);
  } catch (err) {
    throw err;
  }
};

exports.check = async (req, res) => {
  try {
    const { id } = req.body;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const user = await User.find({ _id: id });
      console.log(user);
      if (user.length > 0) {
        res.json({
          check: true,
          data: user
        });
      } else {
        res.json({
          check: false,
          message: "User not found"
        });
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.register = async (req, res) => {
  try {
    const { userName, outsorced, area } = req.body;

    const item = new User({
      userName: userName,
      area: area,
      outsorced: outsorced,
      vouchers: []
    });
    item.save();
    res.sendStatus(200);
  } catch (err) {
    throw err;
  }
};

exports.generateCard = async (req, res) => {
  const { QRCode, name } = req.body;
  console.log(QRCode, name);
  const OBJcard = {
    name: name,
    qr: QRCode
  };
  const applyText = (canvas, text) => {
    const context = canvas.getContext("2d");

    let fontSize = 70;
    do {
      context.font = `${(fontSize -= 5)}px sans-serif`;
    } while (context.measureText(text).width + 70 > canvas.width);
    return context.font;
  };

  const heinekenLogo = await loadImage("https://i.imgur.com/VV8rQ10.png");
  const QRCodeImg = await loadImage(OBJcard.qr);

  const width = 600;
  const height = 950;

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  context.beginPath();
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  context.fill();

  context.strokeStyle = "#000";

  // Draw a rectangle with the dimensions of the entire canvas
  context.strokeRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#000";
  context.font = applyText(canvas, OBJcard.name);
  context.fillStyle = "#000";
  context.fillText(OBJcard.name, 60, height / 2 + 300);

  context.drawImage(heinekenLogo, 60, height / 2 + 350, width - 150, 110);
  context.save();

  context.drawImage(
    QRCodeImg,
    canvas.width / 2 - 275,
    height / 2 - 365,
    550,
    550
  );

  const centerX = canvas.width / 2;
  const centerY = 70;
  const radius = 25;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = "black";
  context.fill();
  context.lineWidth = 5;
  context.stroke();
  context.closePath();

  context.save();

  const image = await canvas.toDataURL("image/keycard.png");

  res.send(image);
};
