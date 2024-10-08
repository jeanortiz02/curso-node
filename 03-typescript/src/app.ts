

const heroes = [
    {
        id: 1,
        name: 'Iroman',
        owner: 'Marvel'
    },
    {
        id: 2,
        name: 'Spiderman',
        owner: 'Marvel'
    },
    {
        id: 3,
        name: 'Batman',
        owner: 'Marvel'
    },

]

const findHeroById = (id : number) => {
    return heroes.find(hero => hero.id === id);
}


const hero = findHeroById(2);
console.log(hero?.name);