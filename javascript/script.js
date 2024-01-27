const cards=document.querySelectorAll('.memory-card');
let hasFlippedCard=false;
let lockboard = false;
let firstCard,secondCard;

function flipcard(){
    if(lockboard) return;
    if(this===firstCard) return;
    this.classList.toggle('flip');
    if(!hasFlippedCard){
        hasFlippedCard=true;
        firstCard=this;
    }
    else{
        //second click
        hasFlippedCard=false;
        secondCard=this;
        //cards match
        checkMatch();
    }
}
function checkMatch(){
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        //match
        disableCards();
    }
    else{
        //not a match
        unflipCards();
    }
}
function disableCards(){
    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipcard);
}
function unflipCards(){
    lockboard=true;
    setTimeout(()=>{
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockboard=false;
    },500);
}
function resetBoard(){
    
    [hasFlippedCard,lockboard]=[false,false];
    [firstCard,secondCard]=[null,null];
}
(function shuffle(){
    cards.forEach(card =>{
        let randomPos=Math.floor(Math.random()*12);
        card.style.order=randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click',flipcard));