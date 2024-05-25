"use client"
import { Popover } from "@/components/ui/popover";
import { TransactionType } from "@/lib/types"
import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query"
import { PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { CommandGroup} from "@/components/ui/command";
import { CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Command} from "lucide-react";
import { cn } from "@/lib/utils";
import CreateCategoryDialog from "./CreateCategoryDialog";
import { CommandInput } from "@/components/ui/command";
import { CommandList } from "@/components/ui/command";
import { CommandEmpty } from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
// import { ChevronDown } from "lucide-react";
// import { ChevronsDownIcon } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import React from "react"
interface Props{
    type:TransactionType,

}
export default function CategoryPicker({type}:Props){
    const [open,setOpen] = React.useState(false);
    const [value,setValue] = React.useState("");

    const categoriesQuery = useQuery({
        queryKey: ["categories", type],
        queryFn: () =>
          fetch(`/api/categories?type=${type}`).then((res) => res.json()),
      });
    const selectedCategory = categoriesQuery.data?.find(
        (category:Category)=>category.name === value
    )
    return(
        <Popover open = {open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            "Select category"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CommandInput placeholder="Search category..." />
          {/* <CreateCategoryDialog type={type} successCallback={successCallback} /> */}
          <CommandEmpty>
            <p>Category not found</p>
            <p className="text-xs text-muted-foreground">
              Tip: Create a new category
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name);
                      setOpen((prev) => !prev);
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        "mr-2 w-4 h-4 opacity-0",
                        value === category.name && "opacity-100"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
        </Popover>
    )
}
function CategoryRow({category}:{category:Category}){
    return (
        <div className="flex items-center gap-2">
        <span role="img">{category.icon}</span>
        <span>{category.name}</span>
        </div>
    );
}