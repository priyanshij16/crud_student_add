import  sequelize from "sequelize";
import Student from "../models/student";
import { Exception } from "../res-handler";
import { ERROR_TYPE, RESPONSE_STATUS } from "../res-handler/constants";
import messages from "../res-handler/messages";
import databaseInstance from "../config/db";
import { log } from "console";

export class SudentService{
    
    async createStudent(req:any){
        const transaction= await databaseInstance.transaction()
        try{
            let{
                studentId,
                studentName,
                email,
                contact,
                gender,
                dob,
                createdBy
            } = req.body

            let studentBody = {
                studentId,
                studentName,
                email,
                contact,
                gender,
                dob,
                createdBy
            }
            let studentExist=await Student.findOne({where:{email:studentBody.email }})
         if(studentExist){
            if(studentExist.get().email=== req.body.email){
                throw new Exception(RESPONSE_STATUS.ALREADY_EXISTS, ERROR_TYPE.ALREADY_EXISTS, `Email Already Exist`)
            }
        }
        else{
            let studentData= await Student.create(studentBody)
            console.log("Student has been created");
            await transaction.commit();
            return Promise.resolve(studentData);
            
        }
}
    catch(err){
        console.log("Error duration creation student data ",err);
        await transaction.rollback();
        return Promise.reject(err);
        
    }
}
  async updateStudent (req:any){
     let transaction= await databaseInstance.transaction();
     try{
        // null checks that state req must not be null or undefined
        // firstly req will check from params then it will fetch id 
        let studentId= req?.params?.id
        let { studentName, contact,gender,dob}= req.body;
        let studentBody= { studentName,contact,gender,dob}

        let studentExist= await Student.findOne({where :{studentId:studentId} })
       
        if(!studentExist){
            throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId}StudentId does not exists`)
        }
        await Student.update(studentBody,{where:{studentId:studentId}})
      let updateStudent= await Student.findOne({where :{studentId:studentId}})
     
      console.log("Student updated succesfully");
      await transaction.commit();
      return Promise.resolve(updateStudent)
      
    }
    catch(err){
        console.log("Error in updation check data again",err);
        await transaction.rollback();
        return Promise.resolve(err)
        
    }
  }

  async getStudent(req:any) {

    try{
        let data = await Student.findAll()
        console.log("All Student fetched successfully");
        return Promise.resolve(data);
    }
    catch(err){
        console.log("Error in fetching data", err);
        return Promise.reject(err);
    }
}

async getStudentById(req:any){
   let studentId = req?.params?.id

        try{
            let studentExist = await Student.findOne({ where: {studentId: studentId } })
            if (!studentExist) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId}studentId does not exists`)
            }
    
            console.log("Fetched student data by Id");
            return Promise.resolve(studentExist);
        }
        catch(err){
            console.log("Error in fetching data by Id", err);
            return Promise.reject(err);
        }
}

async deleteStudentById(req:any){
    let studentId=req?.params?.id
    let transaction= await databaseInstance.transaction()

    try{
        let studentExist = await Student.findOne({ where: {studentId: studentId } })
        if (!studentExist) {
            throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId}studentId does not exists`)
        }

        let deletedData = await Student.destroy({where: {studentId: studentId}})
        await transaction.commit();
        console.log("student Deleted Successfully");
        return Promise.resolve(deletedData);      
    }
    catch(err){
        console.log("Error in deleting student by Id", err);
        await transaction.rollback();
        return Promise.reject(err);
    }
}
}
export default new SudentService();