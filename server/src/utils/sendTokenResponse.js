// src\utils\sendTokenResponse.js

import cookieOptions from "./cookieOptions.js";
import generateToken from "./generateToken.js";

const sendTokenResponse = (user, statusCode, res, message) => {
  const { _id, name, email, role } = user;
  const token = generateToken(_id);
  res.cookie("token", token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    message: message,
    user: { id: _id, name, email, role },
  });
};
export default sendTokenResponse;
