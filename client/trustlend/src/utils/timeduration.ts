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


export function getSecondsDifference(inputDate: Date): number {
    // Get the current date
    const currentDate = new Date();
  
    // Convert both dates to seconds (divide by 1000 to convert from milliseconds)
    const inputDateInSeconds = Math.floor(inputDate.getTime() / 1000);
    const currentDateInSeconds = Math.floor(currentDate.getTime() / 1000);
  
    // Calculate the difference in seconds
    const differenceInSeconds = inputDateInSeconds - currentDateInSeconds;
  
    return differenceInSeconds;
  }
  