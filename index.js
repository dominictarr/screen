var EventEmitter = require("events").EventEmitter
    , extend = require("xtend")

    , point = require("./point")

/*global screen:true*/
module.exports = screen

function screen(center, width, height) {
    var list = []

    center.on("change", function () {
        list.forEach(function (tuple) {
            calculate.apply(null, tuple)
        })
    })

    return {
        add: add
    }

    function add(absolute) {
        var relative = point()

        list.push([relative, absolute])

        absolute.on("change", function () {
            calculate(relative, absolute)
        })

        calculate(relative, absolute)

        return relative
    }

    function calculate(relative, absolute) {
        relative.x = absolute.x - center.x + (width / 2)
        relative.y = absolute.y - center.y + (height / 2)
        relative.emit("change")
    }
}