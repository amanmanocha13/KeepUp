//function to open add category form
function openForm(){
    $('#form-popup').css('display','block');
}
//function to close add category form
function closeForm(){
    $('#form-popup').css('display','none');
}
//function to add new category in db using ajax
$('#submit-category').on('click',function(e){
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/categories/create',
        data: $('#category-form').serialize(),
        success: function(data){
            new Noty({
                theme: 'relax',
                text: data.message,
                type: 'info',
                layout: 'topCenter',
                timeout: 1500
            }).show();
            closeForm();
        }
    })
});


//to update status of tasks in db whenever tasks are checked/unchecked
 $('.list').on('change','input[type="checkbox"]',function(){
     var listId = $(this).attr('list');
     var taskId = $(this).attr('name');
     var content = $(this).attr('value');
     let checked = this.checked;
        $.ajax({
            type: 'get',
            url: `/lists/update-task/?list=${listId}&task=${taskId}&checked=${this.checked}`,
            success: function(data){
                var element = $(`#list-${listId}-task-${taskId}`);
                element.remove();
                if(checked){
                    $(`#completed-list-${listId}`).append(element);  
                }else{
                    $(`#uncompleted-list-${listId}`).append(element);
                }
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
    });