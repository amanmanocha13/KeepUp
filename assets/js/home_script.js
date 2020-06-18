//to render partial if any of the signin-btn is clicked
$('#authenticate-section').on('click','.signin-btn',function(e){
    e.preventDefault();
    $.ajax({
        method: 'get',
        url: '/signin',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/signin');
        }
    })
});

//to render partial if signin-btn is clicked
$('#signin-btn').on('click',function(e){
    e.preventDefault();
    $.ajax({
        method: 'get',
        url: '/signin',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/signin');
        }
    })
});

//to render partial if any of the signup-btn is clicked
$('#authenticate-section').on('click','.signup-btn',function(e){
    e.preventDefault();
    $.ajax({
        method: 'get',
        url: '/signup',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/signup');
        }
    })
});

//to render partial if signup-btn is clicked
$('#signup-btn').on('click',function(e){
    e.preventDefault();
    $.ajax({
        method: 'get',
        url: '/signup',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/signup');
        }
    })
});

//to render partial if any of the email signup-btn is clicked
$('#authenticate-section').on('click','#email-signup-btn',function(){
    $.ajax({
        method: 'get',
        url: '/email-sign-up',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/email-sign-up');
        }
    })
});

//to render partial if forgot-pass-link is clicked
$('#authenticate-section').on('click','#forgot-pass-link',function(){
    $.ajax({
        method: 'get',
        url: '/signin/forgot',
        success: function(data){
            $('#authenticate-section').html(data);
            window.history.pushState('','','/signin/forgot');
        }
    })
});

//to render partial if forgot-pass form is submitted
$('#authenticate-section').on('submit','#forgot-pass-form',function(e){
    e.preventDefault();
    $.ajax({
        method: 'post',
        url: '/signin/forgot',
        data: $('#forgot-pass-form').serialize(),
        success: function(data){
            $('#authenticate-section').html(data);
        }
    })
});