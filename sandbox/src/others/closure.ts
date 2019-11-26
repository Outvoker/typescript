
const outer = () => {
    let m = 100
}

function init() {
    let state = 0;

    function increment() {
        state += 1;
        return state;
    }

    increment();
}

init();

class Square {
    type = "Square" as const  //<-discriminant for class, since TS3.4
}
class Triangle {
    type: "Triangle" = "Triangle" //<-discriminant class, before TS3.4
}
interface Circle {
    type: "Circle" //<-discriminant for interface
}
type Rectangle = {
    type: "Rectangle" //<-discriminant for type
}
type Shape = Square | Circle | Rectangle
type ShapeType = Shape["type"]

