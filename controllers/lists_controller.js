const Category = require('../models/category');
const List = require('../models/list');

//action to show all lists 
module.exports.lists = async function(req,res){ 
        try{
        let lists = await List.find({user:req.user}).sort('-createdAt'); //finding lists of logged in user(latest list first)
        return res.render('lists',{
            lists: lists
        })
        }catch(error){
            console.log("Error : ",error);
            return;
        }
}
//action to show add list page
module.exports.add = function(req,res){
    Category.find({user : req.user},function(err,categories){
        if(err){
            console.log("Error in finding categories : ",err);
            return;
        }
            return res.render('addList',{
                categories: categories
            })
    });
}

//action to show edit list page
module.exports.editList = function(req,res){
    List.findOne({_id:req.params.id}).exec(function(err,list){
        if(err){
            console.log('Error in finding list : ',err);
            return;
        }
        var date = list.dueDate; // get the current date
        var dd = date.getDate(); //get the day from today.
        var mm = date.getMonth()+1; //get the month from today +1 because january is 0!
        var yyyy = date.getFullYear(); //get the year from today
    
        if(dd<10) {
            dd='0'+dd
        }
        if(mm<10) {
            mm='0'+mm
        }
        var dueDate =  yyyy+'-'+mm+'-'+dd; //converted mongoose date format to js date format
        console.log('Due date is : ',dueDate);
        return res.render('editList',{
            list:list,
            dueDate: dueDate 
        })
    });
}

//action to update list
module.exports.updateList = async function(req,res){
    try{
    let list = await List.findById(req.params.id);
        list.title = req.body.title;
        list.dueDate = req.body.dueDate;
        if(req.body.tasks){ 
            if(Array.isArray(req.body.tasks)){ //if tasks entered is more than 1
                for(task of req.body.tasks){
                    list.tasks.push({
                        content: task
                    })
                }
            }else{
                list.tasks.push({
                    content: req.body.tasks
                });
            }
    }
        await list.save();
        req.flash('success','List Updated successfully');
        return res.redirect('/lists');
    }catch(err){
        console.log('Error in updating list : ',err);
    }
}

//action to update task when they are completed/non completed
module.exports.updateTask = function(req,res){
    List.findById(req.query.list,function(err,list){
        if(err){
            console.log("error in updating task : ",err);
            return;
        }
        list.tasks.forEach(function(task){
            if(task._id == req.query.task){
                    task.completed = req.query.checked;
            }
        });
        list.save();
        return res.status(200).json({
            message: "Task Updated Successfully"
       });
    });
}

//action to delete tasks
module.exports.deleteTask = async function(req,res){
    await List.findByIdAndUpdate(req.query.list, { $pull: {tasks: {_id: req.query.task}}});
        return res.status(200).json({
            message: "Task deleted Successfully"
       });
}

//action to create new list
module.exports.create = function(req,res){

    let tasks = [];
    if(Array.isArray(req.body.tasks)){
        for(task of req.body.tasks){
            tasks.push({
                content: task
            });
        }
    }else{
        tasks.push({
            content: req.body.tasks
        })
    }
    List.create({
        title: req.body.title,
        dueDate: req.body.dueDate,
        category: req.body.category,
        tasks: tasks,
        user: req.user       
    },function(err,list){
        if(err){
            console.log("Error in creating list : ",err);
            return;
        }
        req.flash('success','List created successfully')
        return res.redirect('/lists');
    });
}

//action to delete a list
module.exports.delete = function(req,res){
    List.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log('Error in deleting list : ',err);
            return;
        }
        req.flash('success','List deleted successfully');
        return res.redirect('/lists');
    });
}