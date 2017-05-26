var express= require("express");
var app=express();//invoking express as function
var router=express.Router();
var mongoose=require("mongoose");
var Customer=require("./models/customer")
var bodyParser=require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))//to get data in url eencoded format

//to connect to db

mongoose.connect("mongodb://localhost/techminds",function(){
	console.log("Connected successfully")
})


router.get("/",function(request,response){
	response.send({name:"John Galt"})
})

router.get("/customers",function(request,response){
	Customer.getCustomers(function(err,customerData){ //call back function 
			if(err){
				throw err;
			}
			response.json(customerData);
	})
})

router.post("/customer",function(request,response){
	var customerObj=request.body;//posted data
	Customer.createCustomer(customerObj,function(err,customer){
		if(err){
			throw err;
		}
		response.json(customer)
	})
})

//used to change particular parameter without effecting other

router.put("/customer/:id",function(request,response){
	var userId=request.params.id;
	var dataPostman=request.body;
	
	Customer.getCustomersById(userId,function(err,dataDB){
		if(err){
			throw err;
		}
	var bodyObj={
		name:dataPostman.name || dataDB.name,
		mail:dataPostman.mail || dataDB.mail,
		mobile:dataPostman.mobile || dataDB.mobile,
	}
	Customer.editCustomer(userId,bodyObj,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
	});
})

router.delete("/customer/:id", function(request,response){
	var userId=request.params.id;
	Customer.removeCustomer(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/find/:id",function(request,response){
	var userId=request.params.id;
	Customer.getCustomersById(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})

router.get("/find/:id",function(request,response){
	var userId=request.params.id;
	Customer.getCustomersOneId(userId,function(err,data){
		if(err){
			throw err;
		}
		response.json(data)
	})
})



app.use("/api",router)

var PORT=process.env.PORT|| 3000;

app.listen(PORT,function(){
	console.log("Listen to port....."+PORT)
})
