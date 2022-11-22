let inputEl = document.getElementById('save-btn')
let input = document.getElementById('input-content')
let valueEl = document.getElementById('links')
let i=0
links=[]
inputEl.addEventListener("click",function()
{
    links.push(input.value)
    console.log(links)
    // for(i=0;i<links.length;i++)
    // {
        valueEl.innerHTML += "<li>" + links[i] + "</li>"
        i++    
    // }
})