import  sequelize from "sequelize";
import {Model, CreationOptional} from "sequelize";
import databaseInstance from "../config/db";
import Address from "./address";

export interface  StudentAttributes{
    studentId:string
    studentName:string
    email:string
    contact:string
    gender:string
    dob:string
    createdAt:Date
    createdBy: string
    updatedAt: Date
    updatedBy: string
    deletedAt: Date
    deletedBy: string
}
 // here keyword creationoptional used as a optional 
class Student extends Model<StudentAttributes>{
     declare studentId:string
     declare  studentName:string
     declare email:string
     declare contact:string
     declare gender:string
     declare dob:string
     declare createdAt:Date
     declare createdBy: string
     declareupdatedAt: CreationOptional< Date>
     declare updatedBy: CreationOptional<string>
     declare  deletedAt:  CreationOptional <Date>
     declare  deletedBy: CreationOptional<string>
}
// here init method is ues to connect this tabel to datbase
// also init takes 2 arguement 
Student.init({
     studentId:{
        type:sequelize.UUID,
        defaultValue:sequelize.UUIDV4,
        allowNull:false,
        primaryKey:true,
        unique:true
     },
     studentName:{
         type:sequelize.STRING,
         allowNull:false,

     },
     email:{
        type:sequelize.STRING,
        allowNull:false,
        unique:true
     },
     contact:{
        type:sequelize.STRING,
        allowNull:false
     }, 
     gender : {
        type: sequelize.STRING,
        allowNull: false,
    },
    dob : {
        type: sequelize.DATE,
        allowNull: false,
    },
    createdAt : {
        type: sequelize.DATE,
        allowNull: true,
    },
    createdBy : {
        type: sequelize.STRING,
        allowNull: true,
    },
    updatedAt : {
        type: sequelize.DATE,
        allowNull: true,
    },
    updatedBy : {
        type: sequelize.STRING,
        allowNull: true,
    },
    deletedAt : {
        type: sequelize.DATE,
        allowNull: true,
    },
    deletedBy : {
        type: sequelize.STRING,
        allowNull: true,
    }
},
     {
        sequelize:databaseInstance,
        tableName:'student',
        timestamps:true,
        paranoid:true
     } 
     //paranoid 
//The specialty they are told to delete a record they never truly delete it. Instead
  //, they add a special column called deleted, which holds the timestamp of when this deletion request was made.
 );

 Student.hasMany(Address,{
    foreignKey:"studendId"
 })
 export default Student;