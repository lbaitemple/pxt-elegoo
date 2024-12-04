// Add your code here

namespace coco {
    let severoPin: AnalogInOutPin = pins.D3;

    //% block="Set severo $severoPin at $pos "
    //% severoPin.defl=pins.D3
    //% pos.min=-99
    //% pos.max=99
    //% subcategory=Servo

    export function setPos(severoPin: AnalogInOutPin, pos: number): void {
        severoPin.analogWrite(pos);
    }
}