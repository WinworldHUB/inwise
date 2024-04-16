export type Member = {
    id: number;
    name: string;
    email: string;
    companyName: string;
    address: string;
    industry: string;
    country: string;
    phone: string;
    city: string;
    bankDetails: BankDetails;
}

export type Item = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    unitPrice: number;
}

export type Invoice = {
    id: number;
    date: string;
    dueDate: string;
    member: Member;
    items: Item[];
    total: number;
    status: string;
}

export type BankDetails = {
    id: number;
    bankName: string;
    accountNumber: string;
}