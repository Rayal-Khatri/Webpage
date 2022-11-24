let inputEl = document.getElementById('save-btn')
let input = document.getElementById('input-content')
let valueEl = document.getElementById('links')
let tempHTML =""
let i=0
links=[]
inputEl.addEventListener("click",function()
{
    links.push(input.value)
    input.value=""
    displaylink()
    
})
function displaylink()
{
for(i=0;i<links.length;i++)
tempHTML+=  `<li>
                <a href="${links[i]}">
                ${links[i]}
                </a>
            </li>
            `
valueEl.innerHTML = tempHTML  
tempHTML=""
}