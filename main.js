let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let sumbit =document.getElementById("sumbit");
let mood='create';
let tmp;


// get total
function getTotal(){
    if(price.value !=''){
        let result=( +price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML=result
        total.style.background='#040'
    }else{
        total.innerHTML=''
        total.style.background='#930b01'
    }
}
// creat product
let datapro;
if(localStorage.product!=null){
    datapro=JSON.parse(localStorage.product)
}else{
    datapro=[];
}


sumbit.onclick = function(){
    let newpro ={
        title:title.value, 
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,

    }
    if(title.value!=''&&price.value!=''&& category.value!=''){
    if(mood==='create'){
    if(newpro.count>1){
        for(let i=0;i<newpro.count ;i++)
        datapro.push(newpro)
        localStorage.setItem('product' , JSON.stringify(datapro))
    }else{
        datapro.push(newpro)
    }
     }else{
        datapro[ tmp  ]=newpro;
        mood='create'
        sumbit.innerHTML='create';
        count.style.display='block'
     }
     clearData()
    }
    // savalocalstorge
    // localStorage.setItem('product' , JSON.stringify(datapro))
    // clearData()
    // showData()
}
// clear inputs
function clearData(){
title.value='';
price.value='';
taxes.value ='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';
}

// read
function showData(){
    getTotal()
    let table='';
    for(let i =0; i <datapro.length;i++){
         table += `

        <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>

        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
    </tr>
        
        
        
        `;
    }
    document.getElementById('tbody').innerHTML=table;
    }


//   document.getElementById('tbody').innerHTML=table;
    let btnDelete =document.getElementById('deletAll');
    if(datapro.length>0){
        btnDelete.innerHTML=`
        <button onclick="deletAll()" >DeletAll</button>
        `
    }
    else{
        btnDelete.innerHTML='';
        showData()
    }

function deletAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()
}

showData();
// delelet
function deletData(i){
 datapro.splice(i,1)
 localStorage.product=JSON.stringify(datapro)
 showData()
}


// updata
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    getTotal();
    count.style.display='none'
    category.value=datapro[i].category;
    sumbit.innerHTML='update'
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search
let searchMood='title';
function getsearcMood(id){
    let search=document.getElementById('search');
if(id=='searchTitle'){
    searchMood='title';
    search.placeholder='search By Title'
}else{ searchMood='category'
search.placeholder='search By create'
}
search.focus()
search.value='';
showData()

}
function searchData(value){
    let table='';
    if(searchMood=='title')
    for(let i=0;i<datapro.length;i++){
      if(datapro[i].title.includes(value.tolowercase()))
      table += `

    <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
    
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deletData(${i})" id="delete">delete</button></td>
  </tr>

      `; 
      

}else{

}
 document.getElementById('tbody').innerHTML=table;
} 
// clean data