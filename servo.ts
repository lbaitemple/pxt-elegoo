namespace ELEGOO {
    let servoPin: AnalogInOutPin = pins.D3;



    // Map function similar to Arduino's map()
    function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    // Function to move the servo to a specific angle
    function moveServo(pin: AnalogInOutPin, angle: number) {
        // Map the angle (0-180) to pulse width (1000-2000 microseconds)
        const pulseWidth = map(angle, 0, 180, 1000, 2000);
        const period = 20000; // 20 ms period (50 Hz)
        const highTime = pulseWidth;
        const lowTime = period - highTime;

        // Generate the PWM signal manually
        for (let i = 0; i < 50; i++) { // 50 iterations for 1 second
            pin.digitalWrite(true)
            // delay 500 ms
            control.waitMicros(highTime);
            pin.digitalWrite(false);
            control.waitMicros(lowTime);
        }
    }


    //% block="Servo turn $angle default connect pin $servo "
    //% servo.defl=pins.D3
    //% angle.defl=90
    //% subcategory=Servo
    export function turn(servo: AnalogInOutPin, angle: number): void {
        servoPin = servo;
        moveServo(servoPin, angle);
    }
}
