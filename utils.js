function randomListItem(list){
    return list[Math.floor(Math.random()*list.length)]
}

function clamp(min, max, value){
    return Math.min(max, Math.max(min, value))
}

async function gimmie(url, json=true) {
    let response = await fetch(url)
    if (json){
        return await response.json()
    } else {
        return await response.text()
    }
}

async function wait(ms){
    return new Promise((resolve) => {
        let start = Date.now()
        setTimeout(function() {
            console.log(Date.now()-start)
            resolve()
        }, ms)
    })
}

function inRangeOf(x, y, z){
    return x > y-z && x < y+z
}

function rangeOf(x, y){
    return Math.abs(x-y)
}

function calcHypotenuse(a, b) {return Math.sqrt((a * a) + (b * b))}