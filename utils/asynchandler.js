const asynchandler = (handleRequest)=>{
    return (req,res,next)=>{
        Promise.resolve(handleRequest(req,res,next)).catch
        ((error)=>next(error))
    }
}

export {asynchandler}