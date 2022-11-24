let inputEl = document.getElementById('save-btn')
let clearEl = document.getElementById('clear-btn')
let input = document.getElementById('input-content')
let valueEl = document.getElementById('links')
let tempHTML =""
let i=0
links=[]
displaylink()
inputEl.addEventListener("click",function()
{
    links.push(input.value)
    localStorage.setItem("myLinks",JSON.stringify(links))
    input.value=""
    displaylink()   
})
function displaylink()
{
    
    valueEl.innerHTML = ""  
    tempstr=JSON.parse(localStorage.getItem("myLinks"))
    for(i=0;i<tempstr.length;i++)
    tempHTML+=  `<li>
                    <a href="${tempstr[i]}">
                    ${tempstr[i]}
                    </a>
                </li>
                `
    valueEl.innerHTML = tempHTML  
    tempHTML=""
}
clearEl.addEventListener("click",function()
{
    links=[]
    localStorage.clear()
    displaylink()
})