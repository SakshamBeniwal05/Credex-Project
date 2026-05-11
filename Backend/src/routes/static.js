import { Router } from "express";
import { model_api_data,plan_Data } from "../controller/static_controller.js";

export const staticRouter = Router();

staticRouter.route('/models').get(model_api_data);
staticRouter.route('/result').get(plan_Data);