var panel = $("#quiz-area");
var countStartNumber = 30;
 


// Question set
var questions = [{
  question:"How many feet are in a mile??",
  answers: ["1000000", "1760", "5280", "400"],
  correctAnswer: "5280",
  image: "assets/images/feet.jpg"
}, {
  question: "The inventor of the World Wide Web?",
  answers: ["Bruce-Lee", "Tim Berners-Lee", "Big Fish", "Alice"],
  correctAnswer: "Tim Berners-Lee",
  image: "assets/images/lee.jpg"
}, {
  question: "My Heart Will Go ON came from which movie?",
  answers: ["Titanic", "The Notebook", "Big Fish", "Alice in Wonderland"],
  correctAnswer: "Titanic",
  image: "assets/images/titanic.jpg"
}, {
  question: "Which of the following is not associated with the UNO?",
  answers: ["ILO", "WHO", "ASEAN", "SEP"],
  correctAnswer: "ASEAN",
  image: "assets/images/asean.jpg"
}, {
  question: "Which  company is nicknamed  'Big Blue' ?",
  answers: ["MICROSOFT", "SAP", "ORACLE", "IBM"],
  correctAnswer: "IBM",
  image: "assets/images/ibm.png"
}, {
  question: "What does the N stand for in NATO?",
  answers: ["NO", "North", "Near", "No Doubt"],
  correctAnswer: "North",
  image: "assets/images/north.png"
}, {
  question: "3 + 3 * 3 / 3 ? ",
  answers: ["9", "0", "6", "3"],
  correctAnswer: "6",
  image: "assets/images/six.png"
}, {
  question: "Name the seventh planet from the sun?",
  answers: ["Jupiter", "Mars","Uranus", "Pluto"],
  correctAnswer: "Uranus",
  image: "assets/images/uranus.jpg"
}, {
  question: "Which chess piece can only move diagonally?",
  answers: ["Queen", "King", "Knight", "The bishop"],
  correctAnswer: "The bishop",
  image: "assets/images/bishop.jpg"
}, {
  question: "What is the name of the boy from the Simpsons family?",
  answers: ["Bart", "Doug", "Lisa", "Marge"],
  correctAnswer: "Bart",
  image: "assets/images/bart.png"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

 countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      alert("TIME UP");
      this.timeUp();
      this.results();  
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);
    panel.html( "<h2 class='animated bounceInLeft'>" + questions[this.currentQuestion].question + "</h2>");
    
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button btn btn-outline-secondary animated bounceInRight' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
   }
    panel.append ("<audio controls autoplay src='assets/images/clock.mp3'  </audio>");
    panel.append("<br><br><button class='btn btn-primary btn-sm' id='btn'>" + "Question  " + (this.currentQuestion + 1)  + " / " + questions.length +"</button>");
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion().bind(this);

  },

  timeUp: function() {

       clearInterval(window.timer);
       panel.html("<h2> Time up </h2>");
       panel.append( "<h3> correct answer is " + questions[this.currentQuestion].correctAnswer);
       panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
       if (this.currentQuestion === questions.length-1) {
        setTimeout(this.results, 3*1000);
       } 
       else {  
        setTimeout(this.nextQuestion,3*1000);  
       }
  },

  results: function() {
    
    clearInterval(window.timer);
    
    panel.html( "<h2>All done, here is your result!</h2>");
    $("#counter-number").html(this.counter);
    $("#done").remove();
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over' class='animated  pulse infinite'>Play Again </button>");
  },
 
  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;
    clearInterval(window.timer);
    panel.html("<h2>Wrong!</h2>");
    panel.append( "<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);
    this.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

// RESET 
  reset: function() {
    location.reload();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  
  $("#sub-wrapper").prepend( "<h4 id='done'> You have [ <span id='counter-number'>30</span> ] Seconds</h4>");
  $("#sub-wrapper").prepend("<p> " + $('#name').val() + "</p><br>");
  $("#sub-wrapper").prepend("<img src='assets/images/now.gif' id='now' >");
  game.loadQuestion().bind(game);
});
