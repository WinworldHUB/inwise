import {Invoice} from "../types"

export const Invoices: Invoice[] = [];

export const getAllInvoices = (): Invoice[] => Invoices;

export const getInvoice = (id: string): Invoice | undefined => {
  if (!id) {
    throw new Error("Invoice ID is required");
  }
  return Invoices.find((invoice) => invoice.id === id);
};

export const createInvoice = (invoice: Invoice): void => {
  if (!invoice) {
    throw new Error("Invoice is required");
  }
  Invoices.push(invoice);
};

export const updateInvoice = (id: string, updatedInvoice: Invoice): void => {
  if (!id) {
    throw new Error("Valid invoice ID is required");
  }
  const index = Invoices.findIndex((invoice) => invoice.id === id);
  if (index === -1) {
    throw new Error("Invoice not found");
  }
  Invoices[index] = updatedInvoice;
};

export const deleteInvoice = (id: string): void => {
  if (!id) {
    throw new Error("Valid invoice ID is required");
  }
  const index = Invoices.findIndex((invoice) => invoice.id === id);
  if (index === -1) {
    throw new Error("Invoice not found");
  }
  Invoices.splice(index, 1);
};

