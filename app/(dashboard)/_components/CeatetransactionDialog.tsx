"use client"
import React from "react";
import { ReactNode } from "react";
import { TransactionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTrigger,DialogTitle} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
// import Input from "postcss/lib/input";
import { Input } from "@/components/ui/input";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
interface Props{
    trigger:ReactNode;
    type:"income" | "expense"
}
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
export default function CreateTransactionDialog({trigger,type}:Props){
    const form = useForm<CreateTransactionSchemaType>({
        resolver:zodResolver(CreateTransactionSchema),
        defaultValues:{
            type,
            date:new Date()
        }
    })
    return(
        <>
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>
            Create a new{" "}
            <span
              className={cn(
                "m-1",
                type === "income" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {type}
            </span>
            transaction
          </DialogTitle>
                </DialogHeader>
                <Form{...form}>
                    <form className="space-y-4">
                        <FormField
                        control={form.control}
                        name="description"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input defaultValue={""} {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Transaction Description
                                </FormDescription>
                            </FormItem>
                        )}
                        ></FormField>
                        <FormField
                        control={form.control}
                        name="amount"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input defaultValue={0}  type = "number" {...field}/>
                                </FormControl>
                                <FormDescription>
                                    Transaction amount
                                </FormDescription>
                            </FormItem>
                        )}
                        ></FormField>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

        </>
    )
}