// const BASE_URI = "http://ec2-18-130-234-140.eu-west-2.compute.amazonaws.com/api/v1"
const BASE_URI = "https://new.api.winnerx.com/api/v1"
export const FETCH_orders = (id)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"user_id":id,
"customer_id":id,
    "status": "active"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/orders/fetch-all`, requestOptions)
   
}