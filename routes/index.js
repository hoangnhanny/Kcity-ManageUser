const { PrismaClient } = require("@prisma/client");
var express = require("express");
var router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const constant = require("../constant/constant");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/login", async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.json({ status: 400, message: "Invalid params !" });

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (data) {
      let user = data;

      const token = jwt.sign(user, process.env.Secret, {
        expiresIn: constant.tokenLife,
      }); //20 giay
      const refreshToken = jwt.sign(user, process.env.Secret_Refresh, {
        expiresIn: constant.refreshTokenLife,
      });

      // const response = {
      //   status: "Logged in",
      //   token: token,
      //   refreshToken: refreshToken,
      // };

      const authentication = {
        token: token,
        refreshToken: refreshToken,
        data: data,
      };

      await prisma.metaUser.create({
        key: "authentication",
        value: authentication,
        userID: data.id,
      });

      return res.json({
        status: "Logged in",
        token: token,
        refreshToken: refreshToken,
      });
    }
    return res.json({ status: 400, elements: "Login failed!!!" });
  } catch (error) {
    return res.json({ status: 400, elements: "Login failed!!!" });
  }
});

module.exports = router;
