var words=["space", "earth", "solar", "jupiter", "mars", "moon", "neptune", "gibbous", 
    "mercury", "pluto", "waxing", "saturn", "venus", "crescent", "uranus", "planet",
    "waning", "asteroid", "singularity", "astronaut", "comet", "binary", "astronomer", 
    "astronomy", "elliptical", "orbit", "density", "constellation", "void", "cosmonaut", 
    "cosmos", "crater", "day", "dust", "equinox", "eclipse", "ecliptic","galaxy", 
    "lunar", "meteorite", "meteor", "meteoroid", "lens", "gravity", "telescope", 
    "inertia", "supercluster", "nebula", "rocket", "spaceship", "exploration", 
    "solstice", "star", "umbra", "sky", "satellite", "penumbra", "lightyear",
     "observatory", "universe", "zodiac", "hubble"];

var wordChosen="";
var wordArray=[];
var wordDisplay=[];
var guessDisplay=[];
var guessCount=0;
var misses=5;
var wins=0;
var losses=0;

function reset()
{
    lettersGuessed=0;
    wordChosen=words[Math.floor(Math.random()*words.length)]
    console.log(wordChosen);
    wordArray=[];
    wordDisplay=[];
    guessDisplay=[];
    guessCount=0;
    misses=5;
    for(var i=0; i<wordChosen.length; i++)
    {
        wordDisplay.push("_");
        wordArray.push(wordChosen.charAt(i));
    }
}

function isLetter(a)
{
    return (a.toLowerCase() != a.toUpperCase()) && a.length===1;
}

function playWin()
{
    var winSound=document.getElementById("audio-win");
    winSound.play();
}

function playWrong()
{
    var wrongSound=document.getElementById("audio-wrong");
    wrongSound.play();
}

function playRight()
{
    var rightSound=document.getElementById("audio-right");
    rightSound.play();
}

function playLoss()
{
    var lossSound=document.getElementById("audio-loss");
    lossSound.play();
}

reset();

document.onkeyup = function(event)
{
    var wordText=document.getElementById("word-text");
    var guessText=document.getElementById("guess-text");
    var missText=document.getElementById("miss-text");
    var winsText=document.getElementById("wins-text");
    var lossesText=document.getElementById("losses-text");

    var userPressed=event.key;
    if(userPressed==="Backspace")
    {
        reset();
    }
    if(isLetter(userPressed))
    {
        var userLetter=userPressed.toLowerCase();


        for(var i=0; i<wordArray.length; i++)
        {
            if(wordArray[i]===userLetter)
            {
                wordDisplay[i]=userLetter;
            }

        }
        if(guessDisplay.indexOf(userLetter)<0)
        {
            if(wordArray.indexOf(userLetter)<0)
            {
                misses--;
                playWrong();
            }
            else
            {
                playRight();
            }
            guessDisplay.push(userLetter);
            guessCount++;
        }

    }

    var guessedString="";
    var wordString="";
    for(var i=0; i<guessDisplay.length; i++)
    {
        guessedString+=guessDisplay[i].toUpperCase() + " ";
    }
    for(var i=0; i<wordDisplay.length; i++)
    {
        wordString+=wordDisplay[i]+ " ";
    }
    guessText.textContent=""+guessedString;
    wordText.textContent=""+ wordString;
    missText.textContent="" + misses;
    winsText.textContent="" + wins;
    lossesText.textContent="" + losses;
    if(wordDisplay.indexOf("_")<0)
    {
        playWin();
        alert("YOU WIN!");
        reset();
        wins++;

    }
    else if(misses===0)
    {
        playLoss()
        alert("YOU LOSE. BETTER LUCK NEXT TIME!");
        reset();
        losses++;
    }
}
