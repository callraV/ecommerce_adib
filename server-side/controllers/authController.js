const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//nodemailer (automatically sends email)
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  register: async (req, res) => {
    const { username, email, name, password } = req.body;

    //------------------- email duplicate check --------------------------

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(400).send({ message: "Email has been used" });
    }

    //---------------------- password hashing -----------------------------

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //------------------------- add to db --------------------------------

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashPassword)}, ${db.escape(name)}, false, null)`;
    let addUserResult = await query(addUserQuery);

    //--------------- node mailer for verification ---------------------------

    // email's format:
    let mail = {
      from: `Admin<casarea.ral@gmail.com>`,
      to: `${email}`,
      subject: `Acount Verification`,
      html: `<p> Click here to verify your account</p>`, //email's body
    };

    let response = await nodemailer.sendMail(mail);

    //---------------------------------------------------------------

    return res.status(200).send({ data: addUserResult, message: "Register success. Verification sent to " + email });

    //
  },
  test: async (req, res) => {
    return res.status(200).send("Test is running");
  },
  login: async (req, res) => {
    // ambil user yang email = email dari body
    // cek apakah ada, kl gaada response email atau password salah
    // klo ada passwordnya di cek menggunakan bcrypt
    // klo salah passwordnya, response email atau password salah
    // klo betul kita akan buatkan token untuk user yang login
    // lalu response

    try {
      const { email, password } = req.body;
      const isEmailExist = await query(`SELECT * FROM users WHERE email=${db.escape(email)}`);
      if (isEmailExist.length == 0) {
        return res.status(400).send({ message: "Email or Password is Invalid" });
      }

      const isValid = await bcrypt.compare(password, isEmailExist[0].password);

      if (!isValid) {
        return res.status(400).send({ message: "Email or Password is incorrect" });
      }

      let payload = { id: isEmailExist[0].id, isAdmin: isEmailExist[0].isAdmin };

      const token = jwt.sign(payload, "joe", { expiresIn: "1h" });

      //
      // console.log("User logged in");
      // console.log(payload);

      return res.status(200).send({
        message: "Login Success",
        token,
        data: { id: isEmailExist[0].id, username: isEmailExist[0].username, email: isEmailExist[0].email, name: isEmailExist[0].name, isAdmin: isEmailExist[0].isAdmin, imagePath: isEmailExist[0].imagePath },
      });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchAllUser: async (req, res) => {
    try {
      const users = await query(`SELECT * FROM users`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  fetchUser: async (req, res) => {
    try {
      const idParams = parseInt(req.params.id);
      if (req.user.id !== idParams) {
        return res.status(400).send("Unauthorized attempt");
      }
      const users = await query(`SELECT * FROM users WHERE id_users = ${db.escape(idParams)}`);
      return res.status(200).send(users);
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
  checkLogin: async (req, res) => {
    try {
      return res.status(200).send(req);
      // const users = await query(`SELECT * FROM users WHERE id_users = ${db.escape(req.user.id)}`);
      // return res.status(200).send({ data: { id: users[0].id, username: users[0].username, email: users[0].email, name: users[0].name, isAdmin: users[0].isAdmin, imagePath: users[0].imagePath } });
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  },
};
