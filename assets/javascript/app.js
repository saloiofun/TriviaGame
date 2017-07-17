var trivia =
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
            question: "In the game 'Portal', Chell is offered grief counseling and ________ for completing the tests?",
            options: ["cake","$5,000","freedom","a vacation"],
            correctAnswer: 0
        },
        {
            question: "Which of these is NOT a Left 4 Dead character?",
            options: ["Zoey","Francis","David","Louis"],
            correctAnswer: 2
        },
        {
            question: "In 'Resident Evil 4', Leon has to save and escort who across a European village?",
            options: ["The president","The president's daughter","His wife","A scientist"],
            correctAnswer: 1
        },
        {
            question: "Which of these video game consoles came out first?",
            options: ["Playstation","X Box","Sega Saturn","Nintendo 64"],
            correctAnswer: 0
        },
        {
            question: "In 'Super Smash Bros Melee', who is the last possible character that can be unlocked?",
            options: ["Mr. Game &amp; Watch","Mewtwo","Ganondorf","Roy"],
            correctAnswer: 0
        },
        {
            question: "Which of the following video game series is the oldest?",
            options: ["Resident Evil","Metal Gear","Sonic the Hedgehog","Final Fantasy"],
            correctAnswer: 1
        }
        ]
    }
}

$(document).ready(function() { 

    var videoGamesArray = [];
    var moviesArray = [];
    var tvShowsArray = [];
    var answerTimer;
    var right = 0, wrong = 0;

    var populateArray = function(originalArray, copyArray) {
        for (var i = 0; i < originalArray.length; i++) {
            copyArray.push(originalArray[i]);
        }
    }

    populateArray(trivia.videoGame.questionsArray, videoGamesArray);

    var addCategory = function(value, icon, alt) {
        var divCol = $("<div class='col category'>");
        divCol.attr("value", value);
        var img = $("<img class='img-fluid'>");
        img.attr("src", "assets/images/" + icon);
        img.attr("alt", alt);
        return divCol.append(img);
    }

    var categories = function() {
        if ($(".trivia").length) {
            $(".trivia").empty();
        }

        var divRow = $("<div class='row text-center justify-content-center'>");
        divRow.append(addCategory("videoGame", "game.png", "Video Games Triva"));
        divRow.append(addCategory("movie", "movie.png", "Movies Triva"));
        divRow.append(addCategory("tvShow", "tvshow.png", "Tv Shows Triva"));

        $(".trivia").append(divRow);
    }

    categories();

    var answer = function(icon, alt, answer) {
        $(".trivia").empty();
        var divRow = $("<div class='row text-center'>");

        var divImgCol = $("<div class='col-12'>");
        var img = $("<img>");
        img.attr("src", "assets/images/" + icon);
        img.attr("alt", alt);
        divImgCol.append(img);

        divRow.append(divImgCol);

        var divAnswerCol = $("<div class='col-12'>");
        divAnswerCol.html("<h1>" + answer + "</h1>");

        divRow.append(divAnswerCol);
        $(".trivia").append(divRow);
    } 

    var result = function() {
        $(".trivia").empty();

        var divRow = $("<div class='row text-center justify-content-center'>");

        var resultHTML = "<h1>Correct: " + right + "</h1>" + 
        "<h1>Incorrect: " + wrong + "</h1>";

        var divResultCol = $("<div class='col-12'>");
        divResultCol.append(resultHTML);

        var resetButton = $("<button>");
        resetButton.attr("type","button");
        resetButton.attr("value","reset")
        resetButton.addClass("btn btn-success btn-lg buttons");
        resetButton.html("<h3>Reset Game</h3>");

        var divResetCol = $("<div class='col-12'>");
        divResetCol.append(resetButton);

        divRow.append(divResultCol);
        divRow.append(divResetCol);
        $(".trivia").append(divRow);

    }

    var resetGame = function() {
        categories();
        populateArray(trivia.videoGame.questionsArray, videoGamesArray);
        // $("div[value='videoGame'").on("click", function () { 
        //     populateArray(trivia.videoGame.questionsArray, videoGamesArray);
        //     playTrivia(videoGamesArray);
        // })
    }

    function playTrivia(questionsObjArray) {
        if (questionsObjArray.length !== 0) {

            clearInterval(answerTimer);
            $(".trivia").empty();
            var questionsContainer = $("<div>");
            questionsContainer.attr("id","question");
            questionsContainer.addClass("row");

            var index = Math.floor((Math.random() * questionsObjArray.length));   

            questionsContainer.html("<h1>" + questionsObjArray[index].question + "</h1>");

            $(".trivia").append(questionsContainer);

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
                if ( $(this).attr("value") === questionsObjArray[index].correctAnswer.toString() ) {
                    answer("right.png", "Correct", questionsObjArray[index].options[questionsObjArray[index].correctAnswer]);
                    questionsObjArray.splice(index,1);
                    right++;
                    answerTimer = setInterval(function(){playTrivia(questionsObjArray)}, 2000);
                }
                else {
                    answer("wrong.png", "Incorrect", questionsObjArray[index].options[questionsObjArray[index].correctAnswer]);
                    questionsObjArray.splice(index,1);
                    wrong++;
                    answerTimer = setInterval(function(){playTrivia(questionsObjArray)}, 2000);
                }
            })
        } else {
            clearInterval(answerTimer);
            result();
            // $("button[value='reset']").on("click", function () { 
            //     resetGame();
            // })
        }
    }

    $("div[value='videoGame']").on("click", function () { 
        playTrivia(videoGamesArray);
    })
    
    $("button[value='reset']").on("click", function () { 
        resetGame();
    })


})