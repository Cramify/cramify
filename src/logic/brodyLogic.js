
let obj = {
  showTimer: true,
  questionDisplay: false,
  currentQuestion: 0,
  set: [{
    question: 'oof'
  },{
    question: 'floof'
  },{
    question: 'ploof'
  }]
}

export function nextQuestion(){
    obj.currentQuestion = obj.currentQuestion + 1,
    obj.questionDisplay = !obj.questionDisplay
  
  if (obj.currentQuestion + 2 > obj.set.length) {
    //get rid of the timer
    obj.showTimer = false,
    obj.questionDisplay = true  
  }
};