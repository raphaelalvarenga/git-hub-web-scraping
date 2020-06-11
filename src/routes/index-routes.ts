import { Router, Request, Response } from "express";
const router = Router();

import indexController from "../controllers/index-controller";

router.route("/")
    .post(indexController);

export default router;