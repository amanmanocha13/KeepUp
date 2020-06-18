const Category = require('../models/category');
//controller to create a new category
module.exports.create = async function(req,res){
    try{
   let category = await Category.findOne({  
        content: req.body.category,
        user: req.user
    });
    if(!category){  // if category not present then create it
          await Category.create({
            content: req.body.category,
            user: req.user
        });
         if(req.xhr){       //if it is ajax request send json data
            return res.status(200).json({
                message: "Category created successfully"
            });     
         }
         return res.redirect('/lists');
    }
    
    if(req.xhr){
        return res.status(200).json({
            message: "Category already exists"
        });
    }
    return res.redirect('/lists');
    }catch(error){
        console.log("Error : ",error);
        return;
    }    
}