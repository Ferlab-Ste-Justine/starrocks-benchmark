export const takeRandomElemOfArray = (array: unknown[]): unknown => {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
};
