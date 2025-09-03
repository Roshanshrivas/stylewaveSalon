import express from "express";
import { deleteSlot, getAllSlots, getSingleSlots, slotCreate, slotsAllUpdate, updateSlotById } from "../controllers/timeSlot.js";
import { auth, isAdmin, isUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.route("/create").post(auth, isAdmin, slotCreate);
router.route("/update").put(auth, isAdmin, slotsAllUpdate);
router.route("/update/:id").put(auth, isAdmin, updateSlotById);
router.route("/delete/:id").delete(auth, isAdmin, deleteSlot);

router.route("/getAllSlots").get(getAllSlots);
router.route("/getAllSlots/:slotId").get(auth, getSingleSlots);


export default router;