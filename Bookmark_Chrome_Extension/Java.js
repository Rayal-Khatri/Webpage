let inputEl = document.getElementById('save-btn')
let clearEl = document.getElementById('clear-btn')
let input = document.getElementById('input-content')
let valueEl = document.getElementById('links')
let tempHTML =""
links=[]
let i=0
if(localStorage.getItem("myLinks"))
{
    links=JSON.parse(localStorage.getItem("myLinks"))
    displaylink()
}
inputEl.addEventListener("click",function()
{
    links.push(input.value)
    input.value=""
    localStorage.setItem("myLinks",JSON.stringify(links))
    displaylink()   
})
clearEl.addEventListener("dblclick",function()
{
    links=[]
    localStorage.clear()
    displaylink()
})
function displaylink()
{  
    valueEl.innerHTML =""  
    tempstr=links
    console.log(tempstr,tempstr.length)
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