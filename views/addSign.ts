export const addSign = (value: number, plusNeeded = true): string => {
    if (value > 0 && plusNeeded) {
        return '+';
    } else if (value < 0) {
        return '-';
    } else {
        return '';
    }
};
