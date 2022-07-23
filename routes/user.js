const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const router = require('express').Router();



//Chưa test
router.post("/token", authJwt.verifyToken)

router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
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

module.exports = router;
