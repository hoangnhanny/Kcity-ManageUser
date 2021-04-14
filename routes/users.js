const { PrismaClient } = require("@prisma/client");
var express = require("express");
var router = express.Router();
const constant = require("../constant/constant");

const prisma = new PrismaClient();

/* GET users listing. */

// Save info user

router.post("/save-user", async (req, res, next) => {
  const { email, fullname, username, avatar, status, deleted } = req.body;

  if (!email || !fullname || !username || !avatar || !status || !deleted) {
    return res.json({ status: 400, message: "Invalid params !" });
  }

  try {
    const data = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        username: username,
        avatar: avatar,
        status: status,
        deleted: deleted,
      },
    });

    res.json({
      status: 200,
      message: "Success!",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

//Get list user

router.get("/get-list", async (req, res, next) => {
  const { page } = req.query;
  const skipPage = page ? constant.pageNumber * page - constant.pageNumber : 0;
  try {
    const list = await prisma.user.findMany({
      take: constant.pageNumber,
      skip: skipPage,
      orderBy: {
        createAt: "asc",
      },
    });

    res.json({
      status: 200,
      message: "Success !",
      data: list,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

// Filter user by status

router.get("/filter-status", async (req, res, next) => {
  const { status, page } = req.query;

  if (!status) return res.json({ status: 400, message: "Invalid params !" });
  const skipPage = page ? constant.pageNumber * page - constant.pageNumber : 0;

  try {
    const filterData = await prisma.user.findMany({
      take: constant.pageNumber,
      skip: skipPage,
      where: {
        status: +status,
      },
      orderBy: {
        createAt: "asc",
      },
    });

    res.json({
      status: 200,
      message: "Success !",
      data: filterData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

// Get info User by ID

router.get("/get-user-by-id", async (req, res, next) => {
  const { id } = req.query;

  if (!id) return res.json({ status: 400, message: "ID is require !" });

  try {
    const data = await prisma.user.findFirst({
      where: {
        id: +id,
      },
    });

    res.json({
      status: 200,
      message: "Success !",
      data: data,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

//Update info User

router.put("/update-user", async (req, res, next) => {
  const { id, username, fullname, status, deleted, avatar } = req.body;

  if (!fullname || !username || !avatar || !status || !deleted)
    return res.json({ status: 400, message: "Invalid params !" });

  try {
    const data = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username,
        fullname,
        avatar,
        deleted,
        status,
      },
    });

    res.json({
      status: 200,
      message: "Success !",
      data: data,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

router.get("/filter-time", async (req, res, next) => {
  const { timeStart, timeEnd, page } = req.query;

  if (!timeStart || !timeEnd)
    return res.json({ status: 400, message: "Invalid params !" });
  const skipPage = page ? constant.pageNumber * page - constant.pageNumber : 0;

  try {
    const filterData = await prisma.user.findMany({
      take: constant.pageNumber,
      skip: skipPage,
      where: {
        createAt: {
          gt: timeStart,
          lt: timeEnd,
        },
      },
      orderBy: {
        createAt: "asc",
      },
    });

    res.json({
      status: 200,
      message: "Success !",
      data: filterData,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "False!",
      error: error,
    });
  }
});

module.exports = router;
