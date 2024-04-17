import { Router } from "express";
import {
  getAllInvoicesHandler,
  getInvoiceHandler,
  createInvoiceHandler,
  updateInvoiceHandler,
  deleteInvoiceHandler,
} from "../controllers/invoices";

export const InvoiceRouter = Router();

InvoiceRouter.get("/", getAllInvoicesHandler);
InvoiceRouter.get("/:id", getInvoiceHandler);
InvoiceRouter.post("/", createInvoiceHandler);
InvoiceRouter.put("/:id", updateInvoiceHandler);
InvoiceRouter.delete("/:id", deleteInvoiceHandler);
