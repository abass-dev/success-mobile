const units = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
const scales = ["", "mille", "million", "milliard", "billion", "billiard", "trillion"];

const convertNumberToWords = (number) => { 
    if (number === 0) return "zéro";

    let result = '';
    let scale = 0;

    while (number > 0) {
        let chunk = number % 1000;
        if (chunk > 0) {
            result = `${convertChunk(chunk)} ${scales[scale]} ${result}`.trim();
        }
        number = Math.floor(number / 1000);
        scale++;
    }

    return result.trim();
};

const convertChunk = (number) => {
    let result = '';

    if (number >= 100) {
        const hundreds = Math.floor(number / 100);
        result += (hundreds > 1 ? units[hundreds] + '-' : '') + 'cent';
        number %= 100;
        if (number > 0) {
            result += '-';
        }
    }

    if (number >= 20) {
        const tensIndex = Math.floor(number / 10);
        result += tens[tensIndex];
        number %= 10;
        if (number > 0) {
            if (tensIndex === 7 || tensIndex === 9) {
                result += '-' + teens[number];
            } else {
                result += '-' + units[number];
            }
        }
    } else if (number >= 10) {
        result += teens[number - 10];
    } else if (number > 0) {
        result += units[number];
    }

    return result;
};

export { convertNumberToWords };
