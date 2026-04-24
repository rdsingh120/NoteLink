// src\utils\serverErrorResponse.js

const serverErrorResponse = (funcName, error, res) => {
  console.error(`${funcName} error: ${error}`);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  }); 
};
export default serverErrorResponse