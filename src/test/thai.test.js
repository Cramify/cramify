// testing CreateSet Component
// import {addToSet, createNewSet} from '../logic/thai.logic';

const state = {
    set: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,18,19,20,21]
}

const state2 = {
    set: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
}

const addToSet = (state) => {
    if (state.set.length >= 19) {
        return false
    }else {return true}
}

describe('tests stop at over 20 questions ', () => {
    test('if user has more than 20 questions, stop', () => {
        expect(addToSet(state)).toBe(false)
    })
})

describe('tests can add questions before 20', () => {
    test('if user has less than 20 questions, add', () => {
        expect(addToSet(state2)).toBe(true)
    })
})

let addState = []

const createNewSet = (addState) => {
    addState.push(1)
    return addState.length
}

describe('tests can add', ()=>{
    test('can user add item to set array', ()=>{
        expect(createNewSet(addState)).toBe(1)
    })
})


const didAnswer = (bool) => {
    if(bool){
        return true
    }else {
        return false
    }
}

describe('didAnswer functionality', ()=>{
    test('if clicked, return true', ()=>{
        expect(didAnswer(true)).toBe(true)
    })
    test('if not clicked, return false', ()=> {
        expect(didAnswer(false)).toBe(false)
    })
})









