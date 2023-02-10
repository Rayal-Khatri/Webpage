function getrandcard()
{
    temp=Math.floor(Math.random()*12)+1
    if (temp===1)
        {return(11)}
    else if (temp===11|| temp===12||temp===13)
        {return(10)}
    else
        {return(temp)}
}

function startGame()
{
    Isalive = true
    BlackJack = false
    firstcard = getrandcard()
    secondcard= getrandcard()
    cards = [firstcard,secondcard]
    sum=cards[0]+cards[1]
    document.getElementById('error').textContent=" "
    renderGame()
}

function renderGame()
{
    document.getElementById('message').textContent= "Welcome to the game"
    document.getElementById('cards').textContent = "Cards : "
    for(i=0;i<cards.length;i++)
    {
        document.getElementById('cards').textContent+= cards[i] + ", "
    }
    
    if (sum < 21)
    {
        message="Do you want to  pull a card?"
    }
    else if (sum===21)
    {
        message="Congratulations! You Got a BlackJack!"
        BlackJack=true
    }
    else
    {
        message="Game Over! You Lost!"
        Isalive=false
    }
    document.getElementById('message').textContent= message    
    document.getElementById('score').textContent ="Points : " + sum 
    
}
function addcard()
{
    if(BlackJack===false && Isalive===true)
    {
        newcard=getrandcard()
        cards.push(newcard)
        sum+=newcard
        console.log(newcard)
        // document.getElementById('cards').textContent+= "  "+ newcard 
        renderGame()
    }
    else
    {
        document.getElementById('message').textContent= "PLease start the game again"   
        document.getElementById('error').textContent="Error! Please restart the Game"
    }   
}
