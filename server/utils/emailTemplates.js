let resetPasswordTemplate = (email, userId, forgotPasswordToken,gmail) => {
  const emailTemplate = {
    from: `"Nes-Connect" < ${gmail} >`,
    to: email,
    subject: "Password reset for " + email,
    text:
      "Password Reset Link: " +
      "http://localhost:3000" +
      `/resetpassword` +
      `/${userId}/${forgotPasswordToken}`,
  };
  return emailTemplate;
};

module.exports = { resetPasswordTemplate };
