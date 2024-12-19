// Add your code here

namespace ELEGOO {

    /**
     * Use this file to define custom functions and blocks.
     * Read more at https://makecode.microbit.org/blocks/custom
     */


    enum MovementType {
        //% block="forward"
        MoveForward = 0,
        //% block="backward"
        MoveBackward = 1,
        //% block="left"
        TurnLeft = 2,
        //% block="right"
        TurnRight = 3,
        //% block="stop"
        Stop = 4
    }

    let IN1: DigitalInOutPin = pins.D7;
    let IN2: DigitalInOutPin = pins.D8;
    let IN3: DigitalInOutPin = pins.D9;
    let IN4: DigitalInOutPin = pins.D11;
    let ENA: AnalogInOutPin = pins.D6;
    let ENB: AnalogInOutPin = pins.D5;

    //% block="Move Forward at speed $power "
    //% power.defl= 512
    //% power.min=0
    //% power.max=100
    //% subcategory=Motor
    export function moveForward(power: number): void {
        let realPower = (1023 / 100 * power);
        IN1.digitalWrite(true);
        IN2.digitalWrite(false);
        IN3.digitalWrite(false);
        IN4.digitalWrite(true);
        ENA.analogWrite(realPower);
        ENB.analogWrite(realPower);

    }

    //% block="Move Backward at speed $power "
    //% power.defl= 512
    //% power.min=0
    //% power.max=100
    //% subcategory=Motor
    export function moveBackward(power: number): void {
        let realPower = (1023 / 100 * power);
        IN1.digitalWrite(true);
        IN2.digitalWrite(false);
        IN3.digitalWrite(true);
        IN4.digitalWrite(false);
        ENA.analogWrite(realPower);
        ENB.analogWrite(realPower);

    }

    //% block="Move Left at speed $power "
    //% power.defl= 512
    //% power.min=0
    //% power.max=100
    //% subcategory=Motor
    export function moveLeft(power: number): void {
        let realPower = (1023 / 100 * power);
        IN1.digitalWrite(true);
        IN2.digitalWrite(false);
        IN3.digitalWrite(false);
        IN4.digitalWrite(false);
        ENA.analogWrite(realPower);
    }

    //% block="Move Right at speed $power "
    //% power.defl= 512
    //% power.min=0
    //% power.max=100
    //% subcategory=Motor
    export function moveRight(power: number): void {
        let realPower = (1023 / 100 * power);
        IN1.digitalWrite(false);
        IN2.digitalWrite(false);
        IN3.digitalWrite(true);
        IN4.digitalWrite(false);
        ENB.analogWrite(realPower);
    }

    //% block="Stop "
    //% subcategory=Motor
    export function Stop(): void {
        IN1.digitalWrite(false);
        IN2.digitalWrite(false);
        IN3.digitalWrite(false);
        IN4.digitalWrite(false);
        ENB.analogWrite(0);
        ENA.analogWrite(0);
    }

}
