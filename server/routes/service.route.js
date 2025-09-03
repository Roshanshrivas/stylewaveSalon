import express from "express";
import { getAllservice, getSingleService, serviceCreate, serviceDelete, serviceUpdate } from "../controllers/services.js";
import { auth, isAdmin, isUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Services Routes Access Only Admin
router.route("/service-create").post(auth, isAdmin, serviceCreate);
router.route("/service-update/:serviceId").put(auth, isAdmin, serviceUpdate);
router.route("/service-delete/:serviceId").delete(auth, isAdmin, serviceDelete);

// Get Services (User/Admin)
router.route("/getallservices").get(getAllservice);
router.route("/getSingleService/:serviceId").get(auth, getSingleService);



export default router;