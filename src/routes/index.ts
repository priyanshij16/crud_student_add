import {Router} from 'express'
import { StudentController } from '../controller/studentcontro'
import { AddressController } from '../controller/addresscontro'
// const mainRouter = Router();

export class MainRouter {

    router: Router
    studentModule: StudentController
    addressModule: AddressController
   

    constructor() {
        // Initialize  Controller Object
        this.studentModule = new StudentController()
        this.addressModule = new AddressController()
      
        // Initialize Router Object
        this.router = Router()
        this.studentRoutes()
        this.addressRoutes()
        
    }

    private studentRoutes() {
        this.router.route("/api/v1/students").post(this.studentModule.createStudent)
        this.router.route("/api/v1/students").get(this.studentModule.getStudent)
        this.router.route("/api/v1/students/:id").get(this.studentModule.getStudentById)
        this.router.route("/api/v1/students/:id").patch(this.studentModule.updateStudent)
        this.router.route("/api/v1/students/:id").delete(this.studentModule.deleteStudent)
    }
    private addressRoutes(){
        this.router.route("/api/v1/address").post(this.addressModule.createAddress)
        this.router.route("/api/v1/address").get(this.addressModule.getAddress)
        this.router.route("/api/v1/address/:id").get(this.addressModule.getAddressById)
        this.router.route("/api/v1/address/:id").patch(this.addressModule.updateAddress)
        this.router.route("/api/v1/address/:id").delete(this.addressModule.deleteAddress)
    }
    
}
let mainRoute = new MainRouter().router
export default mainRoute