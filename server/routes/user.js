const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
<<<<<<< HEAD
const router = require('express').Router();


=======
const express = require('express');

const router = express.Router();
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac

//Chưa test

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});
// Chức năng dùng chung
router.get("/", controller.allAccess);

//chức năng cho user
router.get("/", [authJwt.verifyToken], controller.userBoard);

//chức năng cho mod
router.get(
    "/",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
);

//chức năng cho admin
router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 75f626329b0862781b67d00b055aeaf7fe522bac
