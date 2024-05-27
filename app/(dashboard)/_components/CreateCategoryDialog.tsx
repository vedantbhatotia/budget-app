"use client";
import React, { useCallback, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { TransactionType } from "@/lib/types";
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PlusSquare, CircleOff } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "sonner";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CreateCategory } from "../_actions/categories";

interface Props {
    type: TransactionType;
}

export default function CreateCategoryDialog({ type }: Props) {
    const [open, setOpen] = useState(false);
    const form = useForm<CreateCategorySchemaType>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            type,
        },
    });
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: CreateCategory,
        onSuccess: async (data: Category) => {
            form.reset({
                name: "",
                icon: "",
                type,
            });

            // toast.success(`Category ${data.name} created successfully 🎉`, {
            //     id: "create-category",
            // });

            await queryClient.invalidateQueries({
                queryKey: ["categories"],
            });

            setOpen(false);
        },
        // onError: () => {
        //     toast.error("Something went wrong", {
        //         id: "create-category",
        //     });
        // },
    })
    const onSubmit = useCallback((values:CreateCategorySchemaType)=>{
        mutate(values)
    },[mutate])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
                >
                    <PlusSquare className="mr-2 h-4 w-4" />
                    Create new
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create
                        <span
                            className={cn(
                                "m-1",
                                type === "income" ? "text-emerald-500" : "text-red-500"
                            )}
                        >
                            {type}
                        </span>
                        category
                    </DialogTitle>
                    <DialogDescription>
                        Categories are used to group your transactions
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="space-y-8"
                        onSubmit={form.handleSubmit((data) => {
                            mutate(data);
                        })}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Icon</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className="h-[100px] w-full"
                                                >
                                                    {form.watch("icon") ? (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <span className="text-5xl" role="img">
                                                                {field.value}
                                                            </span>
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to change
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CircleOff className="h-[48px] w-[48px]" />
                                                            <p className="text-xs text-muted-foreground">
                                                                Click to select
                                                            </p>
                                                        </div>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full">
                                                <Picker
                                                    data={data}
                                                    onEmojiSelect={(emoji: { native: string }) => {
                                                        field.onChange(emoji.native);
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormDescription>
                                        This is how your category will appear in the app
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant={"secondary"}
                                    onClick={() => {
                                        form.reset();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                                {!isPending && "Create"}
                                {isPending && <span>Creating...</span>}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
