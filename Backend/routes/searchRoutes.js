const router = require("express").Router();
const Property = require("../models/propertySchema");

router.get("/:id",async(req,res)=>{
    try{
        const ppd_id = req.params.id.toUpperCase();
        const searchProperty = await Property.findOne({ ppdId: ppd_id });
        
        if(searchProperty == null ){
            res.status(404).json({
                status:"failed",
                message : "Id not found",
            });
        }else{
            res.status(200).json({
                status: "success",
                details: searchProperty,
            });
        }
    }
    catch{
        res.status(400).json({
            status: "Failed",
            message : "Id not Found",
            error: error
        })
    }
});

module.exports = router;