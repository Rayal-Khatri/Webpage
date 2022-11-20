firstcard = 10
secondcard= 6
message="Starting Game..."
cards = [firstcard,secondcard]
sum=0
function startGame()
{
    document.getElementById('message').textContent= message
    renderGame()
    console.log('hello')
}

function renderGame()
{
    document.getElementById('cards').textContent+= cards[0] + " + " + cards[1]
    sum=cards[0]+cards[1]
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
}