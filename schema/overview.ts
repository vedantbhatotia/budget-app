import { differenceInDays, isValid } from "date-fns";
import {z} from "zod";
export const OverviewSchema = z.object({
    from:z.coerce.date(),
    to:z.coerce.date(),
}).refine((args)=>{
    const {from,to} = args;
    const days = differenceInDays(to,from);
    const isValidRange = days >= 0 && days<=90;
    return isValidRange
})