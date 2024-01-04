import sequelize, { where } from "sequelize";
import Address from "../models/address"
import { Exception } from "../res-handler";
import { ERROR_TYPE, RESPONSE_STATUS } from "../res-handler/constants";
import databaseInstance from "../config/db";
import { Op } from "sequelize";
import Student from "../models/student";
import moment from "moment";
import { log } from "console";

class AddressService{
    async createAddress(req:any){
        const transaction = await databaseInstance.transaction();
        try {
            let { studentId,
                state,
                city,
                pincode,
                createdBy
            } = req.body

            let addressBody = {
               studentId,
                state,
                city,
                pincode,
                createdBy
            }

            let studentExist = await Student.findOne({
                where: { studentId: req.body.studentId },
            })

            if (!studentId) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId} studentId doesnot exists `)
            }

            let addressData = await Address.create(addressBody)
            console.log("Address has been created.")
            await transaction.commit()
            return Promise.resolve(addressData)

        }
        catch (err) {
            console.log("Error in creating the Address", err)
            await transaction.rollback()
            return Promise.reject(err)
        }
        
    }

    async updateAddress(req:any){
        let transaction = await databaseInstance.transaction();
        try {
            let addressId = req?.params?.id
            let {
                studentId,
                state,
                city,
                pincode,
            } = req.body

            let addressBody = {
                studentId,
                state,
                city,
                pincode,
            }
            let studentExist = await Student.findOne({ where: { studentId: req.body.studentId } })
            if (!studentExist) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId} studentId doesnot exists`)
            }

            let addressExist = await Address.findOne({
                where: {
                    [Op.and]: [
                        { studentId: studentId },
                        { addressId: addressId }
                    ]
                }
            })
            if (!addressExist) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${addressId}AddressId does not exists`)
            }

            await Address.update(addressBody, {
                where: {
                    [Op.and]: [
                        { studentId: req.body.studentId },
                        { addressId: addressId }
                    ]
                }
            })
            let updatedAddress = await Address.findOne({
                where: {
                    [Op.and]: [
                        { studentId: req.body.studentId },
                        { addressId: addressId }
                    ]
                }
            })
            console.log("Address updated successfully");
            await transaction.commit();
            return Promise.resolve(updatedAddress);
        }
        catch (err) {
            console.log("Error in updation",err);
            await transaction.rollback();
            return Promise.resolve(err);
        }
    }
    async getAddress(req:any){
        let studentId=req?.query?.studentId
        try{
            let eventTimestamp='01/01/2024  15:34:30-0700';
            
        let eventDateFormat= moment(eventTimestamp).format('DD-MM-YYYY');
        let current = moment();

        let eventDate= moment (eventDateFormat,'DD-MM-YYYY');
        let dayDiff = current.diff(eventDate, 'days')
        console.log("diff", dayDiff);
        if (dayDiff >= 15) {
            return true
        }
        else {
            return false
        }
    }
    catch(err){
        console.log("error in fetching data",err);
        return Promise.reject(err)
        
    }
    }
 
    async getAddressById(req:any){
        let addressId=req?.params?.id
        try{
         let addressExist= await Address.findOne({ where:{addressId:addressId}})
        if(!addressExist){
            throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${addressId}AddressId does not exists`)
        }
        console.log("Fetched address by id");
        return Promise.resolve(addressExist);
        }
        catch(err){
            console.log("Error in fetching data by Id");
            return Promise.reject(err);

        }
    }
    async deleteAddressById(req: any) {
        let addressId = req?.params?.id
        let studentId = req?.query?.studentId
        let transaction = await databaseInstance.transaction()

        try {
            let studentExist = await Student.findOne({ where: { studentId: studentId } })
            if (!studentExist) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${studentId} studentId doesnot exists`)
            }

            let addressExist = await Address.findOne({
                where: {
                    [Op.and]: [
                        { studentId: studentId },
                        { addressId: addressId }
                    ]
                }
            })

            if (!addressExist) {
                throw new Exception(RESPONSE_STATUS.NOT_FOUND, ERROR_TYPE.NOT_FOUND, `${addressId}AddressId does not exists`)
            }

            let deletedData = await Address.destroy({
                where: {
                    [Op.and]: [
                        { studentId: studentId },
                        { addressId: addressId }
                    ]
                }
            })
            console.log("Address Deleted Successfully");
            await transaction.commit();
            return Promise.resolve(deletedData);
        }
        catch (err: any) {
            console.log("Error in deleting Address by Id", err);
            await transaction.rollback();
            return Promise.reject(err);
        }
    }

}
export default new AddressService();
