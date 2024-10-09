export const Duration =(currentBlockTimeStamp:number,endtimeCurrentBlock:number)=>{
    const timeDifference = endtimeCurrentBlock - currentBlockTimeStamp;
    const isNegative = timeDifference < 0;
    const absDifference = Math.abs(timeDifference);
    const hours = Math.floor(absDifference / 3600);
    const minutes = Math.floor((absDifference % 3600) / 60);
    const seconds = absDifference % 60;

    // Format the result with a sign indicator
    return {
        sign: isNegative ? "-" : "+",
        hours,
        minutes,
        seconds
    };

}