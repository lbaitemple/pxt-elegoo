/**
* Custom blocks
*/
//% color="#4C97FF" icon="\uf494"
//% groups="['Motor', 'Servo']"
// board match the pin out is sparkfun ATsamd21g board
//  D10 -	Left motor PWM - need to change it 
//  MOSI (D8) -	Left motor direction
//  D9  -   Right motor PWM
//  D7 - Right motor direction or (https://roboticsbackend.com/arduino-uno-pins-a-complete-practical-guide/)
//  D13 is for onboard LED
//  MISO (D12) - coco_BUTTON pushbutton
// 
const enum CocoMotor {
    //% block="left"
    left = 0,
    //% block="right"
    right = 1,
    //% block="left + right"
    All = 2,
}
declare interface Math {
    floor(x: number): number;
}

const enum cocoLED {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0,
}

const enum cocoNotes {
    //% block="ON"
    ON = 1,
    //% block="OFF"
    OFF = 0,
}

const enum CocoMotors {
    //% block="ON"
    LEFT_ON = 1,
    //% block="OFF"
    LEFT_OFF = 0,

    //% block="ON"
    RIGHT_ON = 1,
    //% block="OFF"
    RIGHT_OFF = 0,
}

const enum DistanceUnit {
    //% block="cm"
    CM = 58, // Duration of echo round-trip in Microseconds (uS) for two centimeters, 343 m/s at sea level and 20°C
    //% block="inch"
    INCH = 148, // Duration of echo round-trip in Microseconds (uS) for two inches, 343 m/s at sea level and 20°C
}

const enum CocoMotorRotation {
    //% block="forward"
    Forward = 1,
    //% block="backward"
    Backward = -1,
}

const enum cocoPushButtonState {
    //% block="forward"
    Forward = 1,
    //% block="backward"
    Backward = -1,
}

function mapValue(
    value: number,
    inputMin: number,
    inputMax: number,
    outputMin: number,
    outputMax: number
): number {
    return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
}

namespace coco {
    const motorRotations = [
        CocoMotorRotation.Forward,
        CocoMotorRotation.Backward,
    ];

    let leftMotorstate = CocoMotors.LEFT_OFF;
    let rightMotorstate = CocoMotors.RIGHT_OFF;
    /**
    * Orient in the direction of the value specified and move forward..
    * @param is the preferred_heading angle to orient to.
    * This function returns an array of 2 numbers which are speeds for left and right motor
    */
    //% blockId="coco_motor_run" block="run motor %motor | at speed %speed \\%"
    //% speed.min=-100
    //% speed.max=100
    //% weight=90
    //% subcategory=Motors
    export function runMotor(motor: CocoMotor, speed: number): void {
    }
    /**
     * Stops a motor.
     * @param motor motor, eg: CocoMotor.left
     */
    //% subcategory=Motors
    //% blockId="coco_motor_stop" block="stop motor %motor"
    //% weight=89
    export function stopMotor(motor: CocoMotor): void {
        if (motor == CocoMotor.left) {

            //pins.digitalWritePin(DigitalPin.P11, 0);
            //pins.digitalWritePin(DigitalPin.P12, 0);
            //pins.digitalWritePin(DigitalPin.P13, 0);
            pins.D10.analogWrite(0);
            pins.D10.digitalWrite(false);  //left motor  PWM
            // pins.D9.digitalWrite(false);  //right motor PWM
            pins.D8.digitalWrite(false); // direction left
            leftMotorstate = CocoMotors.LEFT_OFF;

        }

        else if (motor == CocoMotor.right) {
            //pins.digitalWritePin(pins.D15, 0);
            //pins.digitalWritePin(DigitalPin.P16, 0);
            //pins.digitalWritePin(DigitalPin.P14, 0);
            //  pins.D10.digitalWrite(false);   //left motor  PWM
            pins.D9.analogWrite(0);
            pins.D9.digitalWrite(false);   //right motor PWM

            pins.D7.digitalWrite(false);  //direction right
            rightMotorstate = CocoMotors.RIGHT_OFF;
        }
        else if (motor == CocoMotor.All) {
            pins.D10.digitalWrite(false);  //left motor  PWM
            pins.D9.digitalWrite(false);  //right motor PWM
            pins.D9.analogWrite(0);
            pins.D10.analogWrite(0);
            pins.D8.digitalWrite(false); // direction left
            pins.D7.digitalWrite(false);  //direction right
            leftMotorstate = CocoMotors.LEFT_OFF;
            rightMotorstate = CocoMotors.RIGHT_OFF;
        }
        control.waitMicros(5000); // wait until the state is updated.

    }



    //% blockId="turn" block="Turn Direction %motor at speed %speed \\%"
    //% speed.min=-100
    //% speed.max=100
    //% weight=90
    //% subcategory=Motors
    export function TurnDirection(motor: CocoMotor, speed: number) {
        if (motor === CocoMotor.left) {
            runMotor(CocoMotor.left, -speed)
            runMotor(CocoMotor.right, speed)
        }
        else if (motor === CocoMotor.right) {
            runMotor(CocoMotor.left, speed)
            runMotor(CocoMotor.right, -speed)
        }

    }




    /**
     * Sets the rotation direction of a motor. Use this function at start time to configure your motors without the need to rewire.
     * @param motor motor, eg: CocoMotor.left
     * @param rotation rotation of the motor, eg: CocoMotorRotation.Forward
     */
    //% subcategory=Motors
    //% blockId=coco_motor_set_rotation block="set motor %motor rotation | to %rotation"
    //% weight=88
    export function setMotorRotation(
        motor: CocoMotor,
        rotation: CocoMotorRotation
    ) {
        if (motor === CocoMotor.left || motor === CocoMotor.All) {
            motorRotations[CocoMotor.left] = rotation;
        }

        else if (motor === CocoMotor.right || motor === CocoMotor.All) {
            motorRotations[CocoMotor.right] = rotation;
        }
    }

    //% subcategory=Motors
    //% block="rotate motor $dir at $speed %"
    //% weight=88
    function rotateMotor(speed: number, dir: CocoMotorRotation): void {
        if (dir === CocoMotorRotation.Forward) {
            runMotor(CocoMotor.left, speed)
            runMotor(CocoMotor.right, speed)
        } else {
            runMotor(CocoMotor.left, -speed)
            runMotor(CocoMotor.right, -speed)

        }
        return
    }


    //% blockId="coco_servo" block="Run servo %state"
    //% weight=90
    //% subcategory=Servo
    export function setcocoServo(state: number): void
    {
        pins.D3.analogWrite(state);
    }


    //% blockId="coco_button" block="get button %cocoPushButtonState"
    //% weight=90
    //% subcategory=Button
    export function getcocoButtonState(): boolean {
        return input.buttonD12.isPressed();
    }

    //% blockId=Tinybit_Ultrasonic_Car block="ultrasonic at %pulsePin %readPin return distance(cm)"
    //% color="#006400"
    //% weight=87
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    //% subcategory=Ultrasonic
    /*export function Ultrasonic(
         pulsePin: DigitalInOutPin,
         readPin: DigitalInOutPin
     ): number {
 
         let list: Array<number> = [0, 0, 0, 0, 0];
         for (let i = 0; i < 5; i++) {
 
             pulsePin.setPull(PinPullMode.PullNone);
             pulsePin.digitalWrite(false);
             control.waitMicros(2);
             pulsePin.digitalWrite(true);
             control.waitMicros(15);
             pulsePin.digitalWrite(false);
             let d = readPin.pulseIn(PulseValue.High, 43200);
             list[i] = Math.floor(d / 40);
         }
         list.sort();
         let length = (list[1] + list[2] + list[3]) / 3;
         return Math.floor(length);
     }
 */
}