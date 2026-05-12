import { Router } from "express";
import { model_api_data, plan_Data, getAudit } from "../controller/static_controller.js";

export const staticRouter = Router();

staticRouter.route('/models').get(model_api_data);
staticRouter.route('/audit').post(plan_Data);
staticRouter.route('/audit/:id').get(getAudit);