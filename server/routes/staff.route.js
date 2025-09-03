import express from "express";
import { createStaff, deleteStaff, getAllStaff, getSingleStaff, updateStaff } from "../controllers/staff.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create").post(auth, isAdmin, createStaff);
router.route("/update/:id").put(auth, isAdmin, updateStaff);
router.route("/delete/:id").delete(auth, isAdmin, deleteStaff);

router.route("/getall").get(getAllStaff);
router.route("/getall/:staffId").get(auth, getSingleStaff);


export default router;