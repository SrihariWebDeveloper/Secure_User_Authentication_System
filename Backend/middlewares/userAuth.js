import jwt from "jsonwebtoken";

export const authUser = async(req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized,Please Login Again!!",
    });
  }
  const decode = jwt.verify(token, process.env.JWT_SCREAT_KEY);

  if (decode.id) {
   req.userId = decode.id;
  } else {
    return res.json({
      success: false,
      message: "Not Authorized,Please Login Again!!",
    });
  }
  next();
};
