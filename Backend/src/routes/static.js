import { Router } from "express";
import { model_api_data } from "../controller/static_controller.js";

export const staticRouter = Router();

staticRouter.route('/models').get(model_api_data);

