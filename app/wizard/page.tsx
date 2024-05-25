import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
// import CurrencyComboBox from "@/components/CurrencyComboBox"
import { CurrencyComboBox } from "@/components/CurrencyComboBox"
import { CardDescription } from "@/components/ui/card"
import { CardTitle} from "@/components/ui/card"
import { Separator} from "@/components/ui/separator"
import Link from "next/link"
import { Button} from "@/components/ui/button"
import Logo from "@/components/Logo"
import { Card} from "@/components/ui/card"
export default async function page(){
    const user = await currentUser();
    if(!user){
        redirect('/sign-in');
    }
    return (
        <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
          <div>
            <h1 className="text-center text-3xl">
              Welcome, <span className="ml-2 font-bold">{user.firstName}! 👋</span>
            </h1>
            <h2 className="mt-4 text-center text-base text-muted-foreground">
              Let &apos;s get started by setting up your currency
            </h2>
    
            <h3 className="mt-2 text-center text-sm text-muted-foreground">
              You can change these settings at any time
            </h3>
          </div>
          <Separator />
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>
                Set your default currency for transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CurrencyComboBox />
            </CardContent>
          </Card>
          <Separator />
          <Button className="w-full" asChild>
            <Link href={"/"}>I&apos;m done! Take me to the dashboard</Link>
          </Button>
          <div className="mt-8">
            <Logo />
          </div>
        </div>
      );
}