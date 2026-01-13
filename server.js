// server.js
import express from "express";
const app = express();
const PORT = 3000;

// JSON body parsing uchun
app.use(express.json());



let globalMoment="2025-07-10"
let arrayLength=-1;
let lastOrderId="";


function getCurrentFormattedDateAndTime() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getCurrentFormattedDate() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

console.log(getCurrentFormattedDate());

const url = `https://api.moysklad.ru/api/remap/1.2/entity/retaildemand?filter=moment>2025-07-10&order=moment,desc&limit=1`;
const urlPositions = "https://api.moysklad.ru/api/remap/1.2/entity/retaildemand/c8ccee18-b147-11ef-0a80-043300074828?fields=stock&expand=positions.assortment";



async function newLead(sum,info) {
  const data = 
   [
      {
        "name": `${info}`,
        "price": sum,
        "pipeline_id": 10015254,
        "status_id": 142
        
      }
  ];
  try{
      const response = await fetch("https://happyeventamocrm.amocrm.ru/api/v4/leads", {
      method: "POST",
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBjOWI1NGE3YmNiNzA4ZjRmOGRkODk0OThhOGI1YTUxNWJiZDc3OThjODNkMGNiMzc3MzE4ZTRhMTllMDVhMzM1ZGMyODA0MmFhMzQ1YWIwIn0.eyJhdWQiOiJiNjcyMzNkMy1jNzFjLTRlMTItOTBlYi03ZjExZTZlNmYwZWUiLCJqdGkiOiIwYzliNTRhN2JjYjcwOGY0ZjhkZDg5NDk4YThiNWE1MTViYmQ3Nzk4YzgzZDBjYjM3NzMxOGU0YTE5ZTA1YTMzNWRjMjgwNDJhYTM0NWFiMCIsImlhdCI6MTc1ODU1NjY1MSwibmJmIjoxNzU4NTU2NjUxLCJleHAiOjE4OTMxOTY4MDAsInN1YiI6IjEyOTEyMTAyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyNjMwODE0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwidXNlcl9mbGFncyI6MCwiaGFzaF91dWlkIjoiMjNjYzYyYjMtNTk1OS00MWFkLWJkODctZThiZjA5ZWNkOGE5IiwiYXBpX2RvbWFpbiI6ImFwaS1iLmFtb2NybS5ydSJ9.YPbYh1NU00AdGWlPr5xx4H_QnrLjGkuVYZNFdCVgvcg3T7flq2MJ0laSi1S814Ka6VPM9DggQMvPJW3D3ZKbckG9XyvwXKMTZzypoO-DBLslAHhAcyEstsSRSLIeyrEq54ovNG8RpZ5IIj_Bx3B2tmuhDa-sakr0qfRWeZt2t_7N-iwS81B450LBAMNO0YhRY9cnWl4_EPgbyzIR_X0b9BO7DSMAUP3Q1_bG1iFreSKX3myvOhNtp9qJQcUc57nOxhhmtG9cxOXKD8fN4e88wnxAGt5yD8c1uz6Off8jFMPHLMNUuHHkhob5EFQxvrNe_4sK5XGbVc8pD2SuAPyt0w",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Server javobi:", result);
    console.log(response.ok);
    
  }catch(e){
    console.log(e.error)
  }
}

async function getPositions(id) {
  try {
    const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/retaildemand/${id}?fields=stock&expand=positions.assortment`,{
      method:"GET",
      headers:{
       "Authorization": "Bearer  c007301232a1b0c7a9eebd734398d7aa819b3f84"
       //"Authorization": "Bearer  0e4a364118a70d4ba0a2dd233a47b09fb28225e7"
      }
    });      // GET request
    const data = await response.json();     // JSON ga aylantirish
    //console.log(data.positions.rows[0].assortment.name);
    console.log("")
    let itemsString = "";
    if(data?.positions?.rows?.length>0){
      data.positions.rows.forEach((item,index) => {
      console.log(item.assortment.name)
      itemsString+=item.assortment.name+"\n";
    });

    if(data?.positions?.rows?.length>0){
      let summa=Number(data.sum)/100;
      newLead(summa,itemsString)
    }

    }else{
      console.log("data null")
    }
    
  } catch (err) {
    console.error("Xato:", err.message);
    
  }
}

async function getData() {
  try {
    const dateTime=getCurrentFormattedDate();
    //const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/retaildemand?filter=moment>${globalMoment}&order=moment,desc&limit=1`;
    const response = await fetch(`https://api-admin.billz.ai/v1/transaction-report-table?start_date=${getCurrentFormattedDate()}&page=1&limit=10&shop_ids=cfb91531-9ce8-446c-9be9-80e8130bb480,df254d34-4cef-4622-8541-251166c59605`,{
      method:"GET",
      headers:{
       "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjb21wYW55X2lkIjoiNGY3ODQzMjItZTU0ZC00MWMzLTk1ZTEtYjc4MzdhMWIzYjIyIiwiZGF0YSI6IiIsImV4cCI6MTc2OTYwMTc3NCwiaWF0IjoxNzY4MzA1Nzc0LCJpZCI6IjYzYjk0MTljLTNlNjctNGM2Mi05ZTAwLTcxMTVmMzlkZmRhMyIsInVzZXJfaWQiOiI3MjY5ZGY5OC1jOGExLTQ3YjgtYmQyNi0zZmQ3YWE5MDE1NmYifQ.1Qu-Rr1JOsxBHiUcAzhJjj4a-ljqe9Ds5atzFSxsX-Q",
       //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjb21wYW55X2lkIjoiNGY3ODQzMjItZTU0ZC00MWMzLTk1ZTEtYjc4MzdhMWIzYjIyIiwiZGF0YSI6IiIsImV4cCI6MTc2NzEwOTM3OCwiaWF0IjoxNzY1ODEzMzc4LCJpZCI6IjdiZTI4ZjhhLTllNmEtNGU4MS05MGExLTM3NjRkOTczNDkzYyIsInVzZXJfaWQiOiI3MjY5ZGY5OC1jOGExLTQ3YjgtYmQyNi0zZmQ3YWE5MDE1NmYifQ.Z_ml7gDVicUOOK5XZPUX52RSf_AFWVgHiQ2krVbaeGo",

       //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjb21wYW55X2lkIjoiNGY3ODQzMjItZTU0ZC00MWMzLTk1ZTEtYjc4MzdhMWIzYjIyIiwiZGF0YSI6IiIsImV4cCI6MTc1OTczNDI1MiwiaWF0IjoxNzU4NDM4MjUyLCJpZCI6ImRiNjExMDEyLTFjMjgtNGQ2Ny04MTg4LTEyNWUzYjEwMGJlMiIsInVzZXJfaWQiOiI3MjY5ZGY5OC1jOGExLTQ3YjgtYmQyNi0zZmQ3YWE5MDE1NmYifQ.xolQcHFvy-IeXAyXgxKw3-Kt4Ii75CxqY14SBWNHKA4",
       //"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfcGxhdGZvcm1faWQiOiI3ZDRhNGMzOC1kZDg0LTQ5MDItYjc0NC0wNDg4YjgwYTRjMDEiLCJjb21wYW55X2lkIjoiNGY3ODQzMjItZTU0ZC00MWMzLTk1ZTEtYjc4MzdhMWIzYjIyIiwiZGF0YSI6IiIsImV4cCI6MTc2NTQ1OTc2NywiaWF0IjoxNzY0MTYzNzY3LCJpZCI6IjViODU5NDJkLWFjYTktNDkzOS04ZDRmLTFiYmVhYzIwMzMyZSIsInVzZXJfaWQiOiI3MjY5ZGY5OC1jOGExLTQ3YjgtYmQyNi0zZmQ3YWE5MDE1NmYifQ.KppLKfW7MM0zt8BUiJurJIEiUflLGC0CZ9iITnvKDic",

       "Accept": "application/json"
      }
    });      // GET request
    const data = await response.json(); 
    //console.log("Status:", response.status);
    //console.log("Status Text:", response.statusText);
    //console.log("Headers:", response.headers);
    //console.log(data)
    if(data?.rows?.length>0){
      
      const order_id = data.rows[0].order_id;
      if(lastOrderId!==order_id){
          const customer_name = data.rows[0].customer_name;
          const total_price = data.rows[0].total_price;
          const sold_measurement_value = data.rows[0].sold_measurement_value;
          console.log("");
          console.log("order_id", order_id);
          console.log("CUSTOMER NAME", customer_name);
          console.log("total_price", total_price);
          console.log("sold_measurement_value", sold_measurement_value);
          lastOrderId=order_id;

          newLead(total_price, `${customer_name} - ${sold_measurement_value} шт`)
          
      }else{
        console.log("zakaz yoq ", getCurrentFormattedDate());
      }
    
    


    //globalMoment=customer_name;
    //getPositions(retailDemandId);d
    
    }else{
      console.log("data null")
    }
    
  } catch (err) {
    console.error("Xato:", err.message);
  }
}




function myJob() {
  getData();
  console.log("Har 10 sekundda ishlayapti (funksiya alohida)");
}

setInterval(myJob, 10000);



app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} da ishlayapti`);
});