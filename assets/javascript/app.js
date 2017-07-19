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
        },
        movie : {
            questionsArray : [
            {
                question: "Which two actors directed themselves in movies and won Oscars for Best Actor?",
                options: ["Al Pacino and Timothy Hutton","Jack Nicholson and Kevin Spacey","Laurence Olivier and Roberto Benigni","Tom Hanks and Paul Newman"],
                correctAnswer: 2
            },
            {
                question: "\"After all, tomorrow is another day!\" was the last line in which Oscar-winning Best Picture?",
                options: ["Gone With the Wind","Great Expectations","Harold and Maude","The Matrix"],
                correctAnswer: 0
            },
            {
                question: "Who is the only person to win an Oscar for Best Director for the only movie he ever directed?",
                options: ["Bob Fosse","Frank Borzage","Leo McCarey","Jerome Robbins"],
                correctAnswer: 3
            },
            {
                question: "Who is the most nominated actor in Academy history?",
                options: ["Jack Nicholson","Laurence Olivier","Spencer Tracy","Paul Newman"],
                correctAnswer: 0
            },
            {
                question: "Which movie ends with this final line of dialogue: \"Why, she wouldn't even harm a fly\"?",
                options: ["Diabolique (1996)","Psycho (1960)","To Die For (1995)","Monster (2004)"],
                correctAnswer: 1
            }
            ]
        },
        tvshow : {
            questionsArray : [
            {
                question: "Which of these TV shows ended in 2015?",
                options: ["Parks and Recreation","The Big Bang Theory","The Office","Modern Family"],
                correctAnswer: 0
            },
            {
                question: "Which of these sitcoms was set in Minneapolis?",
                options: ["The Mary Tyler Moore Show","Cheers","Married...with Children","Frasier"],
                correctAnswer: 0
            },
            {
                question: "Which TV network was not originally part of the United States' 'Big Three'?",
                options: ["CBS","NBC","FOX","ABC"],
                correctAnswer: 2
            },
            {
                question: "Which actor from 'Friends' later starred in a titular spin-off?",
                options: ["Jennifer Aniston","David Schwimmer","Courteney Cox","Matt LeBlanc"],
                correctAnswer: 3
            },
            {
                question: "Which character does not work at the Krusty Krab?",
                options: ["Squidward","Mr. Krabs","Plankton","SpongeBob"],
                correctAnswer: 2
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
        setTime : this.time,
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
            triviaGame.setTime--;
            var currentTime = triviaGame.timeConverter(triviaGame.setTime);
            $("#timer h1").html(currentTime);
        }, 
        stopTimer: function() {
            clearInterval(intervalId);
            clockRunning = false;
        },
        resetTimer : function() {
            triviaGame.setTime = triviaGame.time;
            $("#timer h1").html("00:" + triviaGame.time);
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

                hideDiv();
                $("#game").show();
                triviaGame.resetTimer();
                clearInterval(answerTimer);
                clearInterval(questionTimer);

                $("#game").empty();
                var questionsContainer = $("<div>");
                questionsContainer.attr("id","question");
                questionsContainer.addClass("row container");

                var index = Math.floor((Math.random() * questionsObjArray.length));   

                triviaGame.startTimer();

                questionTimer = setTimeout(function() { wrongAnswer(questionsObjArray, index); }, triviaGame.setTime * 1000);

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

    hideDiv();
    $("#categories").show();

    function hideDiv() {
        $("#categories").hide();
        $("#game").hide();
        $("#answer").hide();
        $("#result").hide();
    }

    function answer(icon, alt, answer) {
        hideDiv();
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
        hideDiv();
        $("#timer h1").empty();
        $("#result .resultInfo").empty();
        $("#result").show();

        var resultHTML = "<h1>Correct: " + triviaGame.right + "</h1>" + 
        "<h1>Incorrect: " + triviaGame.wrong + "</h1>";

        $("#result .resultInfo").append(resultHTML);
    }

    function wrongAnswer(obj, index) {
        triviaGame.stopTimer();
        answer("wrong.png", "Incorrect", obj[index].options[obj[index].correctAnswer]);
        obj.splice(index,1);
        triviaGame.wrong++;
        answerTimer = setInterval(function(){triviaGame.playTrivia(obj)}, 2000);
    }

    function loadTrivia(originalArray, triviaArray) {
        hideDiv();
        triviaGame.populateTriviaArray(originalArray, triviaArray); 
        triviaGame.playTrivia(triviaArray);
    }

    $("div[value='videoGame']").on("click", function () { 
        loadTrivia(triviaQuestions.videoGame.questionsArray, triviaGame.videoGamesArray);
    })

    $("div[value='movie']").on("click", function () { 
        loadTrivia(triviaQuestions.movie.questionsArray, triviaGame.moviesArray);
    })

    $("div[value='tvShow']").on("click", function () { 
        loadTrivia(triviaQuestions.tvshow.questionsArray, triviaGame.tvShowsArray);
    })

    $("button[value='reset']").on("click", function () { 
        hideDiv();
        $("#game").empty();
        $("#categories").show();
        triviaGame.resetTimer();
        $("#timer h1").empty();
        triviaGame.right = 0;
        triviaGame.wrong = 0;
    })
})