interface Options {
    material: string;
    backlight: boolean;
}

// interface HitCountOptions {
//     readonly material: string;
//     readonly backlight: string;
// }


type HitCountOptions = {
    readonly [P in keyof Options] : string
}

const hitCount : HitCountOptions = {
    material : "material",
    backlight : "backlight2"
}
console.log(hitCount.material.length)
// hitCount.backlight = "headlight"