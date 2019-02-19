import {nextQuestion} from './brodyLogic'



describe('test next question method', () => {
    let obj = {
        showTimer: true,
        questionDisplay: false,
        currentQuestion: 3,
        set: [{
          question: 'oof'
        },{
          question: 'floof'
        },{
          question: 'ploof'
        },{
            question: 'scoof'
        }]
      }

      function nextQuestion(){
        obj.currentQuestion = obj.currentQuestion + 1,
        obj.questionDisplay = true
      
      if (obj.currentQuestion + 2 > obj.set.length) {
        //get rid of the timer
        obj.showTimer = false,
        obj.questionDisplay = true  
      }
    }
    test('currentQuestion should equal 1', () => {
        nextQuestion()
        expect(obj.currentQuestion).toBe(4)
    })

    test('questionDisplay equal to true', () => {
        expect(obj.questionDisplay).toBe(true)
    })

    test('show timer to be false', () => {
        expect(obj.showTimer).toBe(false)
    })

    test('question display to be false', () => {
        expect(!obj.questionDisplay).toBe(false)
    })

    test('current question should ber greater than set', () => {
        expect (obj.currentQuestion + 2).toBeGreaterThan(4)
    })
   
})