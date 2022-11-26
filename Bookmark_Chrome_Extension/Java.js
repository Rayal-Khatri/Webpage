let inputEl = document.getElementById('save-btn')
let clearEl = document.getElementById('clear-btn')
let input = document.getElementById('input-content')
let valueEl = document.getElementById('links')
let tabs=[]
let getlink = document.getElementById('getlink-btn')
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
    for(i=0;i<links.length;i++)
    tempHTML+=  `<li>
                    <a target="_blank" href="${links[i]}">
                    ${links[i]}
                    </a>
                </li>
                `
    valueEl.innerHTML = tempHTML  
    tempHTML=""
}
getlink.addEventListener("click",function()
{
    chrome.tabs.query({active: true} , function(tabs)
    {
        input.value = (tabs[0].url)
    })
    
    displaylink()
})