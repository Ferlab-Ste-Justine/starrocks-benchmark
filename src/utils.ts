export const takeRandomElemOfArray = (array: any[]): any => {
    let i = Math.floor(Math.random() * array.length);
    return  array[i];
};