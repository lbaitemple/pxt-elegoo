namespace ELEGOO {
    let leftPin: DigitalInOutPin = pins.D2;
    let middlePin: DigitalInOutPin = pins.D4;
    let rightPin: DigitalInOutPin = pins.D10;



    //% block="getLightR "
    //% subcategory=Light
    export function getLightR(): boolean {
        return rightPin.digitalRead();
    }
    //% block="getLightM "
    //% subcategory=Light
    export function getLightM(): boolean {
        return middlePin.digitalRead();
    }

    //% block="getLightR "
    //% subcategory=Light
    export function getLightL(): boolean {
        return leftPin.digitalRead();
    }

}