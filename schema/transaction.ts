import {z} from "zod"
export const CreateTransactionSchema = z.object({
    amount:z.coerce.number().positive().multipleOf(0.01),
    description:z.string().optional(),
    date:z.coerce.date(),
    category:z.string(),
    type:z.union([
        z.literal("income"),
        z.literal("expense")
    ])
})
//exports type CreateTransactionType which is infered from the type of CreateTransactionSchema using the zod infer function z.infer()
export type CreateTransactionSchemaType = z.infer< typeof CreateTransactionSchema>