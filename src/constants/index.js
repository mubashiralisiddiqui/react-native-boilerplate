export const brandColors = {
    darkBrown: '#514835',
    green: '#11B14C',
    lightGreen: '#92C83E'
}

export const ceil = value => Math.ceil(value);
export const floor = value => Math.floor(value);
export const random = () => Math.random();

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
export const  RandomInteger = (min = 1, max = 9999) => {
   min = ceil(min);
   max = floor(max);
   return floor(random() * (max - min + 1)) + min;
}