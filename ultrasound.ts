namespace ELEGOO {
    let echoPin: DigitalInOutPin = pins.A4;
    let trigPin: DigitalInOutPin = pins.A5;

    function calculateDistance(): number {
        trigPin.digitalWrite(false);
        pause(2);
        trigPin.digitalWrite(true);
        pause(10);
        trigPin.digitalWrite(false);

        let d = echoPin.pulseIn(PulseValue.High, 23529.4);

        return d / 58.8235;
    }

    //% block="Ultrasound at trig $trig and echo $echo "
    //% trig.defl=pins.D1
    //% echo.defl=pins.D0
    //% subcategory=Ultrasound
    export function HCSR04(trig: DigitalInOutPin, echo: DigitalInOutPin): number {
        echoPin = echo;
        trigPin = trig;
        return calculateDistance();
    }
}