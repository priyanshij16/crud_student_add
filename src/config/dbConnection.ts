const Umzug= require('umzug')
import sequlize from 'sequelize';
import {Sequelize, DataType } from 'sequelize';
import databaseInstance from './db';
import path from 'path';
import { Migration } from 'typeorm';
import exp from 'constants';

// 
const migrate = new Umzug({
    migrations:{
        // path which will direct to migrations files
        path :path.join(__dirname,'../migrations'),
        pattern:/\.js$/, // opening and cloding of file and endinging with .js extendsion
      params:[databaseInstance.getQueryInterface(),sequlize]
    },
    Storage:"sequelize",
    storageOptions:{
        sequelize:databaseInstance,
    }
})
const connectionDatbase = async()=>{
     try{
        const connectionResult= await databaseInstance.authenticate()
        .then(async()=>{
            console.log("Database connection established");
             
            await migrate.up()
            .then (async()=>{
                console.log("Migration run sucessfully");
            }).catch((err:any)=>{
                console.log("Migration Failed", err);
                
            })
        })
        .catch((err:any)=>{
            console.log("Error in database connection");
            
        })
     }
     catch(err){
        console.log("failed datbase connection");
        return Promise.reject(err);
        
     }

}
export default connectionDatbase;