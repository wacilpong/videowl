import { random, power } from "./utils/lib";
import "./index.scss";

const test = arr => arr.map(n => n * random);

console.log(test([1, 2, 3, 4, 5]));
console.log(power(random, random));
