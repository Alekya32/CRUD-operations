var mongoose=require("mongoose")
var customerSchema=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	mail:{
		type:String,
		required:true
	},
	mobile:{
		type:String,
		required:true
	}

});

var Customer=module.exports=mongoose.model("customer",customerSchema,"customer")

module.exports.getCustomers=function(callback){
	return Customer.find(callback)

}

module.exports.createCustomer=function(customerObj,callback){
	return Customer.create(customerObj,callback)//create() is from mongoose,Customer is mongoose model
}

module.exports.editCustomer=function(userId,customerObj,callback){ //customerObj is model here
	return Customer.update({_id : userId},
						   {$set:{
						   	name:customerObj.name,
						   	mail:customerObj.mail,
						   	mobile:customerObj.mobile
						   }},callback)
}

module.exports.removeCustomer=function(ids,callback){
	return Customer.remove({_id:ids},callback)
}

module.exports.getCustomersById=function(byId,callback){
	return Customer.findById({_id:byId},callback)
}

module.exports.getCustomersId=function(byId,callback){
	return Customer.findOne({_id:byId},callback)
}

