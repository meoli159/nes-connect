let resetPasswordTemplate = (email, userId, forgotPasswordToken) => {
  const emailTemplate = {
    from: "noreply@gmail.com",
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
