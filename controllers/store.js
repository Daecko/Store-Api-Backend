import { getCollections } from "../sqlite/db.js";
import { errorResponse, successResponse } from "../utility/utils.js";

export const retrieveCollections = async (req, res, next) => {
  try {
    const data = await getCollections();
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(error);
  }
};
