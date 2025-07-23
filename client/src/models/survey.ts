export interface Survey {
    _id: string;
    title: string;
    body: string;
    subject: string;
    recipients: Recipient[];
    yes: number;
    no: number;
    userId: string;
    dateSent: string;
    __v: number;
    lastResponded: string;
    status: string;
}

export interface Recipient {
    email: string;
    responded: boolean;
    _id: string;
}
