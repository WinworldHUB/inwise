import express, { RequestHandler } from "express";
import {
  getInvoice,
  getAllInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../models/invoice";
import { Invoice } from "../types";

export const getAllInvoicesHandler: RequestHandler = (req, res, next) => {
  const Invoicess: Invoice[] = getAllInvoices();
  if (!Invoicess) {
    res.status(500).json({ message: "No Invoicess found" });
  }
  res.status(200).json(Invoicess);
};

export const getInvoiceHandler: RequestHandler = (req, res, next) => {
  const id:string = req.params.id;

  if (!id) {
    res.status(400).json({ message: "Invoices ID is required" });
  }
  const Invoices = getInvoice(id);
  if (!Invoices) {
    res.status(500).json({ message: "Invoices not found" });
  }
  res.status(200).json(Invoices);
};

export const createInvoiceHandler: RequestHandler = (req, res, next) => {
  const Invoices: Invoice = req.body;
  if (!Invoices) {
    res.status(400).json({ message: "Invoices is required" });
  }
  createInvoice(Invoices);
  res.status(201).json({ message: "Invoices created successfully", Invoices });
};

export const updateInvoiceHandler: RequestHandler = (req, res, next) => {

  const id:string = req.params.id;

  const Invoices:Invoice = req.body;

  if (!id) {
    res.status(400).json({ message: "Valid Invoices ID is required" });
  }
  if (!Invoices) {
    res.status(400).json({ message: "Invoices is required" });
  }
  updateInvoice(id, Invoices);
  res.status(200).json({ message: "Invoices updated successfully", Invoices });
};

export const deleteInvoiceHandler: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ message: "Valid Invoices ID is required" });
  }
  deleteInvoice(id);
  res.status(200).json({ message: "Invoices deleted successfully" });
};
