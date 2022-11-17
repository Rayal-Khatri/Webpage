count=0
function incr()
{
    count+=1
    document.getElementById('Num').innerText = count
}
function decr()
{
    count-=1
    document.getElementById('Num').innerText = count
}