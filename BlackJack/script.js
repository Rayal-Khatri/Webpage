firstcard = 10
secondcard= 6
newcard=5
message="Starting Game..."
cards = [firstcard,secondcard,newcard]
function startGame()
{
    sum=0
    document.getElementById('message').textContent= message
    sum=cards[0]+cards[1]
    renderGame()
}

function renderGame()
{
    document.getElementById('cards').textContent+= cards[0] + " + " + cards[1]
    if (sum < 21)
    {
        message="Do you want to  pull a card?"
    }
    else if (sum===21)
    {
        message="Congratulations! You Got a BlackJack!"
    }
    else
    {
        message="Game Over! You Lost!"
    }
    document.getElementById('message').textContent= message    
    document.getElementById('score').textContent ="Points : " + sum 
}

function addcard()
{
    sum+=cards[2]
    console.log(sum)
    document.getElementById('cards').textContent+= " + "+cards[2] 
    renderGame()
}