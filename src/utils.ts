export const formatDateToString = (inputData : string, replaceString : string) => {
    return inputData.replace("T", replaceString);
}