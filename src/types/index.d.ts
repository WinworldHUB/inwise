export type Member = {
    id: string;
    name: string;
    email: string;
    company: Company;
    address: string;
    industry: string;
    country: string;
    phone: string;
    city: string;
    bankDetails: BankDetails;
}


export type Company =  {
    id: string;
    name: string;
    address: string;
    phone: string;
}

export type Item = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
}

export type Invoice = {
    id: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    billedBy: Member;
    billedTo: Member;
    items: Item[];
    total: number;
    status: string;
}

export type BankDetails = {
    id: number;
    bankName: string;
    accountNumber: string;
}