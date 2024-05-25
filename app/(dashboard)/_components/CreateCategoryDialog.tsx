import { TransactionType } from "@/lib/types";
import { Category } from "@prisma/client";
import { ReactNode } from "react";
interface Props {
    type: TransactionType;
    successCallback: (category: Category) => void;
    trigger?: ReactNode;
}

export default function CreateCategoryDialog({ type, successCallback, trigger }: Props){
    return(
        <>
        CREATE CATEGORY DIALOG
        </>
    )
}
