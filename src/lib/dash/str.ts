export function Str(value: string){
    return new _Str(value)
}

class _Str{

    value: string = ""

    constructor(value: string) {
        this.value = value
    }

    camelize() {
        return this.value
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
            .replace(/^./, (char) => char.toLowerCase());
    }

    concat(value2, sep: string) {
        return this.value + sep + value2
    }

    randomNumber(digits: number) {
        const min = Math.pow(10, digits - 1);
        const max = Math.pow(10, digits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}