import { Router, Request, Response } from "express";
const router = Router();

import indexController from "../controllers/index-controller";

router.route("/")
    .get(indexController);

export default router;