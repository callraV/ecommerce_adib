const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "casarea.ral@gmail.com",
    pass: "snjrrnjihimwbohh",
  },
});

module.exports = transporter;
