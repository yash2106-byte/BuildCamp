// this is the basic template which will be used while sending a successful respones 
class ApiResponse{
    constructor(statuscode,data,message = "Success"){
        this.statuscode = statuscode
        this.data = data
        this.message =  message
        this.success = statuscode<400
    }
}

export {ApiResponse};