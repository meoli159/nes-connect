const ROLES = ["user", "admin", "moderator"];

// code bị lỗi chưa fix
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`,
            });
            return;
            }
        }
    }
  
    next();
};

const verifyRegister = {
    checkRolesExisted
};

module.exports = verifyRegister;