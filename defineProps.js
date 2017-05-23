var person = {
    name: 'brendon'
}

Object.defineProperty(person, 'gender', {
    set(value) {
        return person.gender = value == 'm' ? 'male' : 'woman'
    },
    get() {
        return person.gender; 
    } 
})

person.gender = 'm'

console.log(person.gender)
