export const formatDateToString = (inputData : string, replaceString : string) => {
    return inputData.replace("T", replaceString);
}

export const returnNumberAfterComa = (inputData : number, decimals : number) => {
    if(inputData === undefined || isNaN(inputData)) {
        return "N/A";
    }
    
    return inputData.toFixed(decimals);
}