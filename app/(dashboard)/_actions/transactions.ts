"use server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
    // Parse and validate the form data using the schema
    const parsedBody = CreateTransactionSchema.safeParse(form);
    if (!parsedBody.success) {
        throw new Error("Validation error occurred");
    }

    // Get the current user
    const user = await currentUser();
    if (!user) {
        // Redirect to sign-in page if the user is not authenticated
        return redirect("/sign-in");
    }

    // Destructure the validated data from the parsedBody
    const { amount, category, date, description, type } = parsedBody.data;

    // Find the category in the database
    const categoryRow = await prisma.category.findFirst({
        where: {
            userId: user.id,
            name: category,
        },
    });

    if (!categoryRow) {
        // Throw an error if the category does not exist
        throw new Error("Category not found");
    }

    // Update or create the monthly history record
    await prisma.monthHistory.upsert({
        where: {
            day_month_year_userId: {
                userId: user.id,
                day: date.getUTCDate(),
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
            },
        },
        create: {
            userId: user.id,
            day: date.getUTCDate(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            expense: type === "expense" ? amount : 0,
            income: type === "income" ? amount : 0,
        },
        update: {
            expense: {
                increment: type === "expense" ? amount : 0,
            },
            income: {
                increment: type === "income" ? amount : 0,
            },
        },
    });

    // Update or create the yearly history record
    await prisma.yearHistory.upsert({
        where: {
            month_year_userId: {
                userId: user.id,
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
            },
        },
        create: {
            userId: user.id,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear(),
            expense: type === "expense" ? amount : 0,
            income: type === "income" ? amount : 0,
        },
        update: {
            expense: {
                increment: type === "expense" ? amount : 0,
            },
            income: {
                increment: type === "income" ? amount : 0,
            },
        },
    });
}
