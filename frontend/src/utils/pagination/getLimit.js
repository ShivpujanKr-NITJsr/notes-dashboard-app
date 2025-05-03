export const getLimit=(xl,lg,md,sm,xs)=>{
    if (xl) return 8;
    else if (lg) return 8;
    else if (md) return 6;
    else if (sm) return 4;
    else if (xs) return 2;
    else return 2
}