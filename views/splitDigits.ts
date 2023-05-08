export const splitDigits = (num: number | string): string => {
    if (isNaN(Number(num)) && isNaN(Number(String(num).split(' ').join('')))) {
        return String(num);
    }

    const splitted = String(num).split('.');

    if (splitted.length === 1) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    splitted[0] = splitted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return splitted.join('.');
};
