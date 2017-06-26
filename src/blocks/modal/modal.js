$('#design').click(function(e) {
    e.preventDefault();
    $('#modal').addClass('modal--open');
    $('#overlay').addClass('overlay--show');
})
$('#callback').click(function(e) {
    e.preventDefault();
    $('#modal').addClass('modal--open');
    $('#overlay').addClass('overlay--show');
})

$('#close').click(function (e) { 
    e.preventDefault();
    $('#modal').removeClass('modal--open');
    $('#overlay').removeClass('overlay--show');
});


var modal_valid_phone = function (cls) {
    $(cls).on('keyup', function (e) {

        var input_phone = $(cls);
        var phone = $(this).val();
        var data = convert_to_number(phone);
        if (data.two !== 9) {
            $(input_phone).val('');
            $(input_phone).blur();
            $(input_phone).focus();
            $(input_phone).addClass('error');
            $('.modal__error-msg').addClass('modal__error-msg--show')
        } else {
            $('.modal__error-msg').removeClass('modal__error-msg--show')
            $(input_phone).removeClass('error');
        }
    });
};

var convert_to_number = function (phone) {
    var num = Number(phone.replace(/\D+/g, ""));
    var two = String(num).charAt(1);
    var two = Number(two);
    var length = num.toString().length;
    return {
        num: num,
        two: two,
        length: length
    };
};

modal_valid_phone('#modal-phone');

var sendPhone = function () {
    if (modal_valid_phone('#modal-phone')) {
        return false;
    } else {
        $('.modal__loading').addClass('modal__loading--show');        
        var dataString = '&feedback-phone=' + $('#modal-phone').val();
        console.log(dataString)
        $.ajax({
            type: "POST",
            url: "phoneAction.php", //Change
            data: dataString,
            success: function () {                
                $('.modal__loading').removeClass('modal__loading--show'); 
                $('.modal__thankyou').addClass('modal__thankyou--show'); 
                setTimeout(function () {
                    // Done Functions
                    $('#modal').removeClass('modal--open');
                    $('#overlay').removeClass('overlay--show');
                }, 3000);
            }
        })
        return false;
    }
}

$('#modal-form').submit(function (e) {
    e.preventDefault();
    sendPhone();
});