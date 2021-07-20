let dels = ["4","5","7","8","9","10","11","12","16","18","19","20","21","22","23","28","32","33","35","39","40","43","44","45","46","48","50","55","56","57","58","61","64","67","68","69","76","78","79","81","84","86","87","90","91","92","95","96","97","98","105","107","109","110","112","113","114","115","117","118","119","120","121","126","130","131","132","133","134","135","136","137","138","140","141","142","148","149","150","153","155","156","157","158","159","161","162","165","166","168","169","171","172","173","176","177","179","180","182","183","184","185","187","190","192","194","195","199","200","201","205","207","208","211","215","216","217","218","222","228","230","231","232","233","234","235","236","237","238","239","240","242","245","248","250","251","253","254","255","256","258","259","261","263","264","265","266","268","269","270","271","274","275","276","277","278","279","283","284","288","289","291","293","294","296","297","298","299","304","305","309","310","311","314","316","319","320","321","322","323","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","342","344","347","348","349","350","351","352","353","354","355","358","359","360","361","362","365","366","367","368","371","372","374","376","377","378","383","384","385","388","389","390","391","392","393","394","395","396","400","407","408","409","411","413","414","415","418","419","422","423","424","425","426","429","430","431","434","436","437","443","444","445","446","447","448","449","450","451","453","454","455","456","457","459","460","461","462","463","464","465","466","467","470","471","472","473","476","477","478","482","483","486","487","488","489","490","491","492","494","495","496","497","498","499","505","507","508","510","511","513","515","524","525","526","527","528","529"];
let size = 3450;
let game = document.getElementsByClassName("game")[0];

class Hero {
    constructor(id, possition) {
        this.id = id;
        this.possition = possition;
    }
}

let arr = [];

function newCharacter() {
    let list = document.getElementsByClassName("item");
    let rand = Math.floor(Math.random() * (list.length - 1));
    let item = list[rand];
    let res = document.getElementById("randomImg");
    res.style.backgroundPosition = item.style.backgroundPosition;
    document.getElementById("randomId").innerHTML = item.classList[2].slice(12);
}

function reset() {
    let items = document.getElementsByClassName("item");   
    for(let i = 0; i < items.length; i++)
        if(items[i].classList.contains("black"))  
            items[i].classList.remove("black");
}

document.body.onload = init;

function init() {
    let game = document.getElementsByClassName("game")[0].innerHTML = null;
    let limits = document.getElementsByClassName("limits")[0].style.display = "block";
    let controls = document.getElementsByClassName("controls")[0];
    controls.style.display = "none";
    getSeed();
}

function startGame() {
    let limits = document.getElementsByClassName("limits")[0].style.display = "none";
    let controls = document.getElementsByClassName("controls")[0];
    controls.style.display = "block";

    addElement();
}

function addElement() {
    let hexSeed = document.getElementById("friendSeed").value;  
    let seed = "";
    for(let i = 0; i < hexSeed.length; i++)
    {
        let temp = parseInt(hexSeed[i], 16).toString(2);
        while (temp.length < 4)
            temp = "0" + temp;
        seed += temp;
    }
    console.log(seed);
    
    let counter = 0;
    let innerCnt = 0;
    let drawCounter = 0;
    let heroes = (size / 150) * (size / 150) - dels.length;

    for(let i = 0; i < size; i+=150)
    {
        for(let j = 0; j < size; j+=150)
        {
            counter++;            
            if(!dels.includes("" + counter))
            {                
                let pos = "-" + i + "px -" + j + "px";
                arr.push(new Hero(innerCnt, pos));
                
                if(seed[innerCnt] == "1")
                {
                    drawHero(arr[innerCnt], ++drawCounter);
                }

                innerCnt++;
            }
        }
    }

    newCharacter(); 
}

function drawHero(hero, drawCounter) {
    let item = document.createElement("li");

    let item_img = document.createElement("div");    
    item_img.classList.add("item");
    item_img.classList.add("all_heroes_image");
    item_img.classList.add("naruto_hero_" + drawCounter);
    item_img.style.backgroundPosition = hero.possition;
    item.insertAdjacentElement("afterbegin", item_img);

    let text = document.createElement("span");
    text.classList.add("item_title");
    text.innerHTML = drawCounter;
    item.insertAdjacentElement("beforeend", text);

    game.insertAdjacentElement("beforeend", item);
}

document.addEventListener("click", e => 
    {
        if(e.target.classList[0] == "item")
        {
            if(e.target.classList[3] == "black")
                e.target.classList.remove("black");
            else
                e.target.classList.add("black");
        }
    }
);

function getSeed() {
    let seed = "0";    
    let heroCnt = +document.getElementById("heroCnt").value;
    let min = 0, max = 215;
    seed = seed.repeat(max + 1);
    while(heroCnt > 0)
    {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        if(seed[rand] == "0")
        {
            seed = seed.replaceAt(rand, "1");
            heroCnt--;
        }
    }
    let hexa = "";
    for(let i = 0; i < max+1; i+=4)
    {
        let temp = seed[i] + seed[i+1] + seed[i+2] + seed[i+3];
        hexa += parseInt(temp, 2).toString(16).toUpperCase();
    }
    console.log(seed);
    document.getElementById("friendSeed").value = hexa;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
