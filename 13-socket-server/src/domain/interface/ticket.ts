

export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handleAtDes?: string; // Escritorio 1
    handleAt?: Date;
    done: boolean;
}