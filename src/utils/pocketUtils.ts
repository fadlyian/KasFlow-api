import { TransactionType } from "../types/TransactionType";

const calculateBalance = (
    currentBalance: number,
    amount: number,
    type: TransactionType
) => {
    if (type === "INCOME") {
        return currentBalance + amount;
    } else if (type === "EXPENSE") {
        return currentBalance - amount;
    } else {
        return currentBalance;
    }
}

export { calculateBalance };