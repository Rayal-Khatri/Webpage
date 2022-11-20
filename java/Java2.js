count=0
function incr()
{
    count+=1
    document.getElementById('Num').textContent = count
}
function decr()
{
    count-=1
    document.getElementById('Num').textContent= count
}
function save()
{
    document.getElementById('Count').textContent+=count
    document.getElementById('Count').textContent+= " - " 
    count = 0
    document.getElementById('Num').textContent = count
    
}