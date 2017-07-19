$(document).ready(function() { 

    var triviaQuestions =
    {
        videoGame : {
            questionsArray : [
            {
                question: "Which of these is NOT a Super Mario Bros. character?",
                options: ["Mario","Luigi","Pikachu","Yoshi"],
                correctAnswer: 2
            },
            {
                question: "The name of Link's legendary sword in the Legend of Zelda series is called what?",
                options: ["Master Sword","Buster Sword","Ragnarok","Energy Sword"],
                correctAnswer: 0
            },
            {
                question: "In the game series 'Donkey Kong', what is the name of DK's grandpa?",
                options: ["Cool Kong","Cranky Kong","Diddy Kong","Grandpa Kong"],
                correctAnswer: 1
            },
            {
                question: "Which of these is not a pokemon?",
                options: ["Pikachu","Jigglypuff","Frodo","Squirtle"],
                correctAnswer: 2
            },
            {
                question: "Which of the following video game series is the oldest?",
                options: ["Resident Evil","Metal Gear","Sonic the Hedgehog","Final Fantasy"],
                correctAnswer: 1
            }
            ]
        }
    }

    var intervalId;
    var questionTimer;
    var answerTimer;
    var clockRunning = false;

    var triviaGame = {
        videoGamesArray : [],
        moviesArray : [],
        tvShowsArray : [],
        right : 0,
        wrong : 0,
        time : 10,
        populateTriviaArray : function(originalArray, triviaArray) {
            for (var i = 0; i < originalArray.length; i++) {
                triviaArray.push(originalArray[i]);
            }
        },     
        startTimer : function() {
            if (!clockRunning) {
                intervalId = setInterval(triviaGame.countTimer, 1000);
                clockRunning = true;
            }
        },
        countTimer : function() {
            triviaGame.time--;
            var currentTime = triviaGame.timeConverter(triviaGame.time);
            $("#timer h1").html(currentTime);
        }, 
        stopTimer: function() {
            clearInterval(intervalId);
            clockRunning = false;
        },
        resetTimer : function() {
            triviaGame.time = 10;
            $("#timer h1").html("00:10");
        },
        timeConverter : function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            }
            else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            if ( t < 0) {
                minutes = "00";
                seconds = "00";
            }
            return minutes + ":" + seconds;
        }, 
        playTrivia : function(questionsObjArray) {
            if (questionsObjArray.length !== 0) {

                $("#game").show();
                $("#answer").hide();
                triviaGame.resetTimer();
                clearInterval(answerTimer);
                clearInterval(questionTimer);

                $("#game").empty();
                var questionsContainer = $("<div>");
                questionsContainer.attr("id","question");
                questionsContainer.addClass("row container");

                var index = Math.floor((Math.random() * questionsObjArray.length));   

                questionTimer = setInterval(function() { wrongAnswer(questionsObjArray, index); }, triviaGame.time * 1000);

                triviaGame.startTimer();

                questionsContainer.html("<h1>" + questionsObjArray[index].question + "</h1>");

                $("#game").append(questionsContainer);

                for (var i = 0; i < questionsObjArray[index].options.length; i++) {
                    var optionsContainer = $("<div class='col-md-6'>");
                    var options = $("<button>");
                    options.attr("type","button");
                    options.attr("value",i)
                    options.addClass("btn btn-warning btn-lg btn-block buttons");

                    options.html("<h3>" + questionsObjArray[index].options[i] + "</h3>");
                    optionsContainer.append(options);
                    questionsContainer.append(optionsContainer);
                }

                $("button").on("click", function () {
                    clearInterval(questionTimer);
                    if ( $(this).attr("value") === questionsObjArray[index].correctAnswer.toString() ) {
                        answer("right.png", "Correct", questionsObjArray[index].options[questionsObjArray[index].correctAnswer]);
                        questionsObjArray.splice(index,1);
                        triviaGame.right++;
                        triviaGame.stopTimer();
                        answerTimer = setInterval(function(){triviaGame.playTrivia(questionsObjArray)}, 2000);
                    }
                    else {
                        triviaGame.stopTimer();
                        wrongAnswer(questionsObjArray, index);
                    }
                })
            } else {
                clearInterval(answerTimer);
                clearInterval(questionTimer);
                result();
                return;
            }
        }
    }

    $("#game").hide();
    $("#answer").hide();
    $("#result").hide();

    function answer(icon, alt, answer) {
        $("#game").hide();
        $(".answerImg").empty();
        $(".answerFeedback").empty();
        $("#answer").show();

        var img = $("<img>");
        img.attr("src", "assets/images/" + icon);
        img.attr("alt", alt);
        $(".answerImg").append(img);

        $(".answerFeedback").html("<h1>" + answer + "</h1>");
    } 

    function result() {
        $("#game").hide();
        $("#answer").hide();
        $("#timer h1").empty();
        $("#result .resultInfo").empty();
        $("#result").show();

        var resultHTML = "<h1>Correct: " + triviaGame.right + "</h1>" + 
        "<h1>Incorrect: " + triviaGame.wrong + "</h1>";

        $("#result .resultInfo").append(resultHTML);
    }

    function wrongAnswer(obj, index) {
        answer("wrong.png", "Incorrect", obj[index].options[obj[index].correctAnswer]);
        obj.splice(index,1);
        triviaGame.wrong++;
        answerTimer = setInterval(function(){triviaGame.playTrivia(obj)}, 2000);
    }
    
    $("div[value='videoGame']").on("click", function () { 
        triviaGame.populateTriviaArray(triviaQuestions.videoGame.questionsArray, triviaGame.videoGamesArray);
        $("#categories").hide();
        $("#game").show();
        
        triviaGame.playTrivia(triviaGame.videoGamesArray);
    })

    $("button[value='reset']").on("click", function () { 
        $("#result").hide();
        $("#answer").hide();
        $("#game").empty();
        $("#categories").show();
        triviaGame.resetTimer();
        $("#timer h1").empty();
        triviaGame.right = 0;
        triviaGame.wrong = 0;
    })
})