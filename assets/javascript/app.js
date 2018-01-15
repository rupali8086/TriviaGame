var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question:"Which Sport is Michael Jordan associated with?",
  answers: ["Basketball", "tennis", "Golf", "Baseball"],
  correctAnswer: "Basketball",
  image: "assets/img/trivia1.jpeg"
}, {
  question: "My Heart Will Go ON came from which movie?",
  answers: ["Titanic", "The Notebook", "Big Fish", "Alice in Wonderland"],
  correctAnswer: "Titanic",
  image: "assets/img/trivia2.jpeg"
}, {
  question: "Which American Actress became Monaco Royalty?",
  answers: ["Audrey Hephburn", "Grace Kelly", "Angelina Joe lee", "Jean Simmons"],
  correctAnswer: "Grace Kelly",
  image: "assets/img/trivia3.jpeg"
}, {
  question: "What does the N stand for in NATO?",
  answers: ["NO", "North", "Near", "No Doubt"],
  correctAnswer: "North",
  image: "assets/img/trivia4.png"
}, {
  question: "What is another word for lexicon?",
  answers: ["vehicle", "expidition", "comicon", "Axile"],
  correctAnswer: "Dictionary",
  image: "assets/img/trivia5.jpeg"
}, {
  question: "Name the seventh planet from the sun?",
  answers: ["Jupiter", "Mars","Uranus", "Pluto"],
  correctAnswer: "Uranus",
  image: "assets/img/trivia6.jpeg"
}, {
  question: "Which chess piece can only move diagonally?",
  answers: ["Queen", "King", "Knight", "A bishop"],
  correctAnswer: "A bishop",
  image: "assets/img/trivia7.jpeg"
}, {
  question: "What is the name of the boy from the Simpsons family?",
  answers: ["Bart", "Doug", "Lisa", "Marge"],
  correctAnswer: "Bart",
  image: "assets/img/trivia8.jpeg"
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
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button input-group-prepend  input-group-text' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");

    }
  },



     // <input type="checkbox" class='answer-button'>
   
  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").html(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").html(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
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

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
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

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion.bind(game)();
});
