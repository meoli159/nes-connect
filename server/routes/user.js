const { authJwt } = require("../middlewares");
const {getAllUser,deleteUser, test} = require("../controllers/user.controller");
const router = require("express").Router();

// router.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

router.get("/",authJwt.verifyToken, getAllUser);
router.delete("/:id",authJwt.verifyTokenAndAdminAuth, deleteUser)


module.exports = router;
