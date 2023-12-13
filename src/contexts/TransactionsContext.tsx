import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TrasactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionContext = createContext({} as TrasactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function fetchTransactions(query?: string) {
        const url = new URL('http://localhost:3000/transactions');

        if(query){
            url.searchParams.append('q', query);
        }

        const response = await fetch(url);
        const data = await response.json()

        setTransactions(data)
    }

    useEffect(() => {
        fetchTransactions();
    }, [])

    return (
        <TransactionContext.Provider value={{ 
            transactions, 
            fetchTransactions
        }}>
            {children}
        </TransactionContext.Provider>
    )
}