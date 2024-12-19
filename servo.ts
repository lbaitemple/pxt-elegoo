namespace ELEGOO {
    let servoPin: AnalogInOutPin = pins.D3;


    //% block="Servo turn $angle default connect pin $servo "
    //% servo.defl=pins.D3
    //% angle.defl=90
    //% subcategory=Servo
    export function turn(servo: AnalogInOutPin, angle: number): void {
        servoPin = servo;
        servoPin.analogWrite(angle);

    }
}
