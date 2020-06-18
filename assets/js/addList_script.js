//to add more input fields if user wants to add more task
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
//function to get today's date
function todayDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today

    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return yyyy+'-'+mm+'-'+dd;
}
$('#dueDate').attr('min', todayDate()); //due date has to be greater than or equal to today's date