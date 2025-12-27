let rNumber = Math.floor(Math.random()*100)+1; 
let lives=7; 

userNum=document.querySelector(".userNum");
gButton=document.querySelector(".guessButton");
hint=document.querySelector(".hint");
list=document.querySelector(".guessList");
result=document.querySelector(".result");
l=document.querySelector("#lives");

function finish(){
    hint.innerText=`the number is: ${rNumber}`;
    userNum.disabled=true;
    gButton.disabled=true;

}

function clickingAction(){ 
    let guess=Number(userNum.value); 
    userNum.value="";
   
item=document.createElement("li");
item.innerText=guess;
    list.append(item);

   
 if(guess===rNumber){ 
    hint.innerText="";
result.innerText="Congratulations!You win.";

finish();
    }
    lives--; 
    l.innerText=lives;
 if(lives===0){ 
        result.innerText="No more lives left.Game Over!";
        finish();
    }
    else {
   
        if(guess>rNumber)
        hint.innerText="Too high!Guess a number lower than that.";
    else if(guess<rNumber)
        hint.innerText="Too low! Guess a number above than that.";
    }
  
    

}

gButton.addEventListener("click",clickingAction);



