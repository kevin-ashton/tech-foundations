const firstName: string = "Dave";
const age: number = 20;
const isGoodLooking: boolean = true;
const cat: any = true;

// declared return type
function sizeOfName(name: string): number {
  return name.length;
}

// inferred return type
let x = sizeOfName("Bob");

class Person {
  public name: string;
  public age: number;

  constructor(p: { name: string; age: number }) {
    this.name = p.name;
    this.age = p.age;
  }

  sayhello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

enum petType {
  cat,
  dog,
}

enum superPower {
  fly,
  laserEyes,
  thunder,
}

const y: superPower = superPower.fly;

interface Pet {
  name: string;
  type: petType;
  superPower: superPower;
}

const animal1: Pet = {
  name: "Fido",
  superPower: superPower.fly,
  type: petType.dog,
};
