let strip: light.NeoPixelStrip = null
forever(function () {
    strip = light.createStrip(pins.D13, 15)
    strip.setAll(0xff0000)
})
