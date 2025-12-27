const URL="https://studentapi-m7a7.onrender.com/student/all";
const urlAdd="https://studentapi-m7a7.onrender.com/student/add";


const content=document.querySelector(".APIcontent");
const table=document.querySelector("table");
const form=document.querySelector("form");
const input=document.querySelectorAll("input");



// get data
async function getData(){ 
   let res=await fetch(URL); 
   let data=await res.json();
   console.log(data);

//    sort.addEventListener("click",()=>{ 
// data.students.sort((a,b)=>b.cgpa-a.cgpa)
//    });

   data.students.forEach((details,i)=>{

    let row=document.createElement("tr");
    let studentName=document.createElement("td");
    studentName.classList.add("nametd");
    let college=document.createElement("td");
    college.classList.add("collegetd");
    let cgpa=document.createElement("td");
    let phone=document.createElement("td");
    phone.classList.add("phonesaptd");
    let sapid=document.createElement("td");
    sapid.classList.add("phonesaptd");
    let batch=document.createElement("td");
    let year=document.createElement("td");
    year.classList.add("yeartd");
    let address=document.createElement("td");

    let update=document.createElement("button");
    update.innerText="update";
    update.classList.add("upbtn");
   
update.addEventListener("click",()=>{

 updateData(details._id,details.studentName,details.college,details.cgpa,details.phone,details.sapid,details.batch,details.year,details.address);
    
});

    let uptd=document.createElement("td"); 
    uptd.classList.add("modifytd");
    uptd.append(update); 

    let deletedata=document.createElement("button"); 
    deletedata.innerText="delete";
    deletedata.classList.add("delbtn");
    let deltd=document.createElement("td"); 
    deltd.classList.add("modifytd");
    deltd.append(deletedata); 
    deletedata.addEventListener("click",()=>{
toDeleteData(details._id);
    });

    studentName.innerText=details.studentName;
    college.innerText=details.college;
    cgpa.innerText=details.cgpa;
    phone.innerText=details.phone;
    sapid.innerText=details.sapid;
    batch.innerText=details.batch;
    year.innerText=details.year;
    address.innerText=details.address;

row.append(studentName,college,cgpa,phone,sapid,batch,year,address,uptd,deltd);
table.append(row);

if(i<20){ 
    update.disabled=true; 
    deletedata.disabled=true;
}


});








}
getData();

//add data 

async function addingData(e){ 
e.preventDefault();



const studentData={ 
    studentName:input[0].value,
    college:input[1].value,
    cgpa:input[2].value,
    phone:input[3].value,
    sapid:input[4].value,
    batch:input[5].value,
    year:input[6].value,
    address:input[7].value,
    };

const params = new URLSearchParams(window.location.search);
  const studentId = params.get("id");

  if(studentId){
    const urlUpdate=`https://studentapi-m7a7.onrender.com/student/update/${studentId}`;
    let res=await fetch(urlUpdate, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(studentData),
    
        })
  }
   else{
    
    let resUnique=await fetch(URL);
    let dataUnique=await resUnique.json();
    let duplicate=dataUnique.students.find(s=>s.sapid === studentData.sapid); 
    if(duplicate){
        alert("this SAP id already exists! Try unique one.");
        input[4].value="";
        return;
    }
    
    let res=await fetch(urlAdd, {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(studentData),

    }
    

   
);} 
window.location.href = "index.html";



}


form.addEventListener("submit",(e)=>{
    addingData(e);
    
}
);

//update
async function updateData(id,name,college,cgpa,phone,sapid,batch,year,address){ 

let addURL=`add.html?id=${id}&name=${encodeURIComponent(name)}&college=${encodeURIComponent(college)}&cgpa=${cgpa}&phone=${phone}&sapid=${sapid}&batch=${batch}&year=${year}&address=${encodeURIComponent(address)}`;
window.location.href=addURL;
}

const params = new URLSearchParams(window.location.search);

if (params.has("id")) {  

    input[0].value = params.get("name") ;
    input[1].value = params.get("college");
    input[2].value = params.get("cgpa") ;
    input[3].value = params.get("phone");
    input[4].value = params.get("sapid");
    input[5].value = params.get("batch");
    input[6].value = params.get("year");
    input[7].value = params.get("address");

}

// delete 

async function toDeleteData(id){ 
    const urlDelete=`https://studentapi-m7a7.onrender.com/student/delete/${id}`;
let res=await fetch(urlDelete,{ 
    method:"DELETE"
})
alert("Student deleted successfully");
console.log("message:",res.json().message);
window.location.reload();

}


