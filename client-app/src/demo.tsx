let data: number | string = 42;

data = '42'

// typescript using the concept of duck typing. i.e. if it quacks like a duck & walk like duck then it must be a duck.
// typescript uses one object to another object in terms properties and method of the typel


// '?' is used to define any property as optional. However, this makes that property is undefined.
// '!' is used to override the behavior of the typescript.
// Date - 11th Feb, 2023.

interface Duck {
    name: string;
    numLegs: number;
    makeSound?: (sound: string) => void;
}

const duck1: Duck = {
    name: 'Hughes',
    numLegs: 2//,
    // makeSound: (sound: any) => console.log(sound)
}

const duck2: Duck = {
    name: 'Jui',
    numLegs: 2,
    makeSound: (sound: any) => console.log(sound)
}

duck1.makeSound!('quack');

export const ducks = [duck1, duck2];