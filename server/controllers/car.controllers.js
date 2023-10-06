const { sendResponse, AppError}=require("../helpers/utils.js")

const Car = require("../models/Car.js")

const carController={}
//Create a car
carController.createCar=async(req,res,next)=>{
    //in real project you will getting info from req
    const info=req.body;
    try{
        //always remember to control your inputs
        if(!info) throw new AppError(402,"Bad Request","Create Car Error")
        //mongoose query
        const created= await Car.create(info)
        sendResponse(res,200,true,{data:created},null,"Create Car Success")
    }catch(err){
        next(err)
    }
}
//Get all car
carController.getAllCars=async(req,res,next)=>{
    const carsPerPage = process.env.REACT_CARS_PER_PAGE;
    const page=req.query.page;
    // console.log(carsPerPage,page)
    //in real project you will getting condition from from req then construct the filter object for query
    // empty filter mean get all
    const filter = {}
    try{
        //mongoose query
        const listOfFound= await Car.find(filter);
        const filerredList = listOfFound.filter((e,i)=>i>=(page-1)*carsPerPage && i<page*carsPerPage);
        sendResponse(res,200,true,{cars:filerredList,total:listOfFound(listOfFound.length/carsPerPage)},null,"Found list of cars success")
    }catch(err){
        next(err)
    }
}
//Update a car
carController.updateCarById=async(req,res,next)=>{
    //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
    //you will also get updateInfo from req
    // empty target and info mean update nothing
    const targetId = req.params.id;
    const updateInfo = req.body;
    console.log("BBBBB",updateInfo)
    //options allow you to modify query. e.g new true return lastest update of data
    const options = {new:true}
    try{
        //mongoose query
        const updated= await Car.findByIdAndUpdate(targetId,updateInfo,options)

        sendResponse(res,200,true,{data:updated},null,"Update car success")
    }catch(err){
        next(err)
    }
}
//Delete car
carController.deleteCarById=async(req,res,next)=>{
    //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

    // empty target mean delete nothing
    const targetId = req.params.id;
    //options allow you to modify query. e.g new true return lastest update of data
    const options = {new:true}
    try{
        //mongoose query
        const updated= await Car.findByIdAndDelete(targetId,options)

        sendResponse(res,200,true,{data:updated},null,"Delete car success")
    }catch(err){
        next(err)
    }
}
//export
module.exports = carController