//to add more tasks
$('#add-task-btn').on('click',function(){
    var el = $(`<li>
    <input required type="text" class="tasks" name="tasks" placeholder="What do you need to do?">
    <i class="fas fa-window-close pointer" id="cancel-btn"></i>
    </li>`);
    $('#task-input-div').append(el);
    deleteInput(el);
});
//to delete input field
function deleteInput(el){
    el.on('click','#cancel-btn',function(){
        el.remove();
    });
}

//to update status in db whenever user checks/unchecks any task
$("input[type='checkbox']").on('click',function(){
    var listId = $(this).attr('list');
    var taskId = $(this).attr('name');
    var content = $(this).attr('value');
       $.ajax({
           type: 'get',
           url: `/lists/update-task/?list=${listId}&task=${taskId}&checked=${this.checked}`,
           success: function(data){
            new Noty({   //to show notification
                theme: 'relax',
                text: data.message,
                type: 'info',
                layout: 'topCenter',
                timeout: 1500
            }).show();
           },error: function(error){
               console.log(error.responseText);
           }
       })
   });

   //to delete task if user clicks on delete button
   $('.pointer').on('click',function(){
       var arr = $(this).attr('id').split('-');
        console.log(arr);
    var listId = arr[1];
    var taskId = arr[3];
    $.ajax({
        type: 'get',
        url: `/lists/delete-task/?list=${listId}&task=${taskId}`,
        success: function(data){
            $(`#list-${listId}-task-${taskId}`).remove();
         new Noty({
             theme: 'relax',
             text: data.message,
             type: 'info',
             layout: 'topCenter',
             timeout: 1500
         }).show();
        },error: function(error){
            console.log(error.responseText);
        }
    })
   })

   function getDate(date) {
    var today = date || new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    return yyyy+'-'+mm+'-'+dd;
}
$('#dueDate').attr('min', getDate());