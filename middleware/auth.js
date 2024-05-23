import jwt from "jsonwebtoken";
import config from "../config/default.json" with { type:"json" };
import { errorResponse } from "../utility/utils.js";

export function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return errorResponse(res, "No access token, authorization denied!", 401);
  try {
    const secret = config.Auth.secret;
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token!", 401);
  }
}
