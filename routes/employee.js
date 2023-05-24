import { Router } from "express";
import {
  deleteEmployee,
  getEmployee,
  listOfEmployee,
  newEmployee,
  updateEmployee,
} from "../controllers/employee.js";
const router = Router();
router.post("/", newEmployee);
router.get("/:id", getEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.get("/", listOfEmployee);

export default router;
