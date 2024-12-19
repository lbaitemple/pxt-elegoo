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
    let ENA: AnalogInOutPin = pins.D5;
    let ENB: AnalogInOutPin = pins.D6;

    //% block="Use version $ver "
    //% ver.defl= 3
    //% ver.min=1
    //% ver.max=4
    //% subcategory=Motor
    export function userversion(ver: number): void {
        switch (ver) {
            case 1:
                IN1 = pins.D9;
                IN2 = pins.D8;
                IN3 = pins.D7;
                IN4 = pins.D6;
                ENA = pins.D10;
                ENB = pins.D5;
                break;
            case 2:
                IN1 = pins.D6;
                IN2 = pins.D7;
                IN3 = pins.D8;
                IN4 = pins.D9;
                ENA = pins.D5;
                ENB = pins.D11;
                break;
            case 2:
                IN1 = pins.D9;
                IN2 = pins.D8;
                IN3 = pins.D7;
                IN4 = pins.D6;
                ENA = pins.D10;
                ENB = pins.D5;
                break;
            default:
                break;
        }
        

    }


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
        IN1.digitalWrite(false);
        IN2.digitalWrite(true);
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
        IN1.digitalWrite(false);
        IN2.digitalWrite(true);
        IN3.digitalWrite(false);
        IN4.digitalWrite(true);
        ENA.analogWrite(realPower);
    }

    //% block="Move Right at speed $power "
    //% power.defl= 512
    //% power.min=0
    //% power.max=100
    //% subcategory=Motor
    export function moveRight(power: number): void {
        let realPower = (1023 / 100 * power);
        IN1.digitalWrite(true);
        IN2.digitalWrite(false);
        IN3.digitalWrite(false);
        IN4.digitalWrite(true);
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
