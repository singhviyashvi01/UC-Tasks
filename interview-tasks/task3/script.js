let search=document.querySelector(".search");
let info=document.querySelector(".info");



async function getNews(event) { 
    let lang=document.querySelector(".languages").value;
    event.preventDefault();
    info.innerHTML="";

const URL = `https://newsdata.io/api/1/latest?apikey=pub_979a7f1352c34698aed5022720254ee8&language=${lang}`;
    
console.log("fetching data....");
    let response = await fetch(URL);
    let data = await response.json();


data.results.forEach((val)=>{ 
    console.log(val);
        
    let divindv=document.createElement("div");
    let imgtitlediv=document.createElement("div");
    info.append(divindv);
    divindv.classList.add("divindv");
    imgtitlediv.classList.add("imgtitlediv");

    let img=document.createElement("img");
    img.src=val.image_url;
   imgtitlediv.append(img);

let title=document.createElement("h2");
imgtitlediv.append(title);
title.innerText=val.title;
    divindv.append(imgtitlediv);

    let des=document.createElement("p");
    des.classList.add("news-des");
    des.innerText=val.description;
    divindv.append(des);

    let link=document.createElement("a");
    link.classList.add("newslink");
link.href=val.link;
link.innerText="click to read full article"
divindv.append(link);


})



    
}

search.addEventListener("click",getNews);


