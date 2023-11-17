// const BASE_URI = "http://ec2-18-130-234-140.eu-west-2.compute.amazonaws.com/api/v1"
// const BASE_URI1 = "http://ec2-18-130-234-140.eu-west-2.compute.amazonaws.com/api"
const BASE_URI = "https://new.api.winnerx.com/api/v1"
const BASE_URI1 = "https://new.api.winnerx.com/api"

export const FETCH_DEAL = ()=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "status": "active"
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/products/deals`, requestOptions)
   
}

export const FETCH_ALL_DEAL = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        "status": "active"
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/deals/fetch-all`, requestOptions)
       
    }
    export const DELETE_ACCOUNT = (id)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        
        "id": id,
        // "status": "active"
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/user/delete`, requestOptions)
       
    }
    

export const FETCH_address = (id)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        
        "customer_id": id,
        "status": "active"
    });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/user_addresses/fetch-all`, requestOptions)
       
    }
export const SignupWithGoogle =(user)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "email":user.email,
    // "password": "123456",
    "first_name": user.givenName,
    "last_name": user.familyName,
    "user_type": "customer",
    "_user_type": "seller",
    "__user_type": "admin",
    "org_name": "workone",
    "email_status: ": "verified",
"social_media": true
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/user/signup`, requestOptions)
    
}

export const SigninWithGoogle =(email)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "email":email,
     "billing": true,
    "social_media": true
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/user/signin`, requestOptions)
    
}



export const SendOtpWithEmail =(email)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "email":email,
     "billing": true,
    "social_media": true
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/user/send-otp`, requestOptions)
    
}


export const VerifyOtpWithEmail =(data)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "email":data.email,
     "otp":data.otp
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/user/verify-otp`, requestOptions)
    
}

export const LoginWithMobile=(mobile)=>{

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "phone": mobile
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/user/phone/signin`, requestOptions)
    }

export const SendPhoneOtp=(mobile)=>{

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "phone": mobile
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/phone/send-otp`, requestOptions)
    
}

export const VerifyOtpWithPhone=(data)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "phone": data.phone,
    "code":data.code
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/phone/verify-otp`, requestOptions)
    
}

export const send_sign_up=(route,value1,value2,value3,value4)=>{
console.log(route.params.num)
    
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "phone_no": route.params.num,
          "org_name": "workone",
    
          "country": route.params.country,
    
          "user_type": "customer",
          
          "first_name": value1,
          "last_name": value2,
          "email": value3,
// "social_media": true,
          "password": value4,

        
    
          
        }),
      };
    
    return fetch(`${BASE_URI}/user/signup`, requestOptions)
        
    }

    export const user_addresses_update=(name,country,last_name,com,value5,id,value1,value2,value3,value4, mobile)=>{

    
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "mobile_no": mobile,
              "customer_id":id,
        
              
              "address": value1+ " " +value2+ " " +value3+ " " +value4+ " " +value5,
              "new":true,
              "country": country,
              "first_name": name,
              "last_name": last_name,
        
              "country_code": value4,
              "city": value5,
              "address_type": com,
            }),
          };
        
        return fetch(`${BASE_URI}/user_addresses/update`, requestOptions)
            
        }

export const GET_USER=(data)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "id": data.id,
    "_email": data.email,
    "___user_type": "customer",
    "_user_type": "seller",
    "__user_type": "admin",
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/users/fetch`, requestOptions)
    
}

export const uploadProfile=(id,path, fileInput)=>{

var formdata = new FormData();
formdata.append("image", fileInput, path);
var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
};
// console.log(`http://13.40.236.30:8000/upload/profile/${id}`)

return fetch(`${BASE_URI1}/upload/profile/${id}`, requestOptions)
    
}

export const update_Customer = (id, first_name, last_name, email, isEmail)=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(isEmail?{

    "id": id,
    "email": email
}:
{
 "id": id,
    "first_name": first_name,
    "last_name": last_name
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/customers/update`, requestOptions)
    

}

export const CREATE_ORDER = (id, type, status, ref, item, address, per )=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "id": 0,
    "customer_id": id,
    "status": "active",
    "payment_status": status,
    "payment_type": type,
    "ref": ref,
    "items": item,
    "shipping_address": address,
    "user_addresses": address,
    "coupon":per
});
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/orders/update`, requestOptions)
    

}

export const Dashboard =()=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = ''

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

return fetch(`${BASE_URI}/dashboard/fetch-all`, requestOptions)
    
}


export const FETCH_ORDER =(id, uid)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id,
        // "user_id":uid
       
      });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/orders/fetch`, requestOptions)
    }

    
export const FETCH_ALL_PRODUCT =()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      
       
      });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/products/fetch-all`, requestOptions)
    }


export const FETCH_COUPON_CODE =(code)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

   
var raw = JSON.stringify({
    "coupon_code": code
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
    
    return fetch(`${BASE_URI}/coupons/validate`, requestOptions)
    }
    


export const TRACK_SHIPMENT =(id)=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
var raw = JSON.stringify({
    "reference_number": id
  });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    return fetch(`${BASE_URI}/jeebly/fetch-order`, requestOptions)
    }



    export const FETCH_ORDER_DEAL =(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        
    var raw = JSON.stringify({
        "order_id": id
      });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        return fetch(`${BASE_URI}/deal_entries/fetch-all`, requestOptions)
        }
    
    