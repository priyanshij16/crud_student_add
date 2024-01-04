require('dotenv').config;
 import ServerSetup from "./server";
 
 var http = require('http')
 import connectionDatabase from "./config/dbConnection";

 let port = normalizePort(process.env.SERVERPORT)
 let expressInstance = new ServerSetup().expressInstance;

 let server= http.createServer(expressInstance)
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    
})
expressInstance.set('port', port)

// Database Connection 

connectionDatabase().then((result) => {
    console.log("Connection established succesfully");  
}).catch((err) => {
    console.log("Connection Failed", err);
    
})

function normalizePort (portVal) {
    const port = portVal === 'string' ? parseInt(portVal) : portVal;
    if(isNaN(portVal)){
        return portVal; // return the string
    }
    else if(portVal >= 0){
        return port; // return the port
    }
    else{
        return false;
    }
}