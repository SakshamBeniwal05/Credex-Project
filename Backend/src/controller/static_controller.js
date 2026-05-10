import model_data from "../api/model_api_data.js";

export const model_api_data = (req, res) => {
  res.status(200).json(model_data);
};