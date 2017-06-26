$('input[type=tel]').inputmask({
    "mask": "+7(999) 999-99-99"
});
if (window.location.toString().indexOf('form.html') > 0) {

    var kitchenFormat = document.querySelector('#kitchen-form'),
        kitchenSetting = document.querySelector('#kitchen-setting'),
        kitchenSize = document.querySelector('#kitchen-size'),
        kitchenShelves = document.querySelector('#kitchen-shelves'),
        kitchenInfo = document.querySelector('#info'),
        orderForm = document.querySelector('#order-form'),
        settingNumber,
        formatValue,
        inputFormat = document.querySelector('input[name=kitchen-form-value]'),
        inputSettingSink = document.querySelector('input[name="setting-sink"]'),
        inputSettingStove = document.querySelector('input[name="setting-stove"]'),
        inputBackSize = document.querySelector('input[name="back-wall-size"]'),
        inputLeftSize = document.querySelector('input[name="left-wall-size"]'),
        inputRightSize = document.querySelector('input[name="right-wall-size"]'),
        inputShelves = document.querySelector('input[name="kitchen-shelves"]'),
        prevSetting = '#setting-1',
        prevSize = '#size-1';

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

    var valid_number_phone = function (cls) {
        $(cls).on('keyup', function (e) {

            var input_phone = $(cls);
            var phone = $(this).val();
            var data = convert_to_number(phone);
            if (data.two !== 9) {
                $(input_phone).val('');
                $(input_phone).blur();
                $(input_phone).focus();
                $(input_phone).addClass('error');
                $('.form-info__error-msg').addClass('form-info__error-msg--show')
            } else {
                $('.form-info__error-msg').removeClass('form-info__error-msg--show')
                $(input_phone).removeClass('error');
            }
        });
    };

    var invalid_phone = function (cls) {
        var input_phone = $(cls);
        var phone = $(input_phone).val();
        var data = convert_to_number(phone);
        if (data.length !== 11) {
            return false
        }
    };




    $(kitchenFormat).click(function (e) {
        var target = e.target;
        settingNumber = $(target).data('setting')
        formatValue = $(target).data('value');
        var settingCls = '#setting-' + settingNumber,
            sizeCls = '#size-' + settingNumber;
        $(inputFormat).val(formatValue);
        $(prevSetting).removeClass('kitchen-setting__wrapper--show');
        $(prevSize).removeClass('kitchen-size__block--show');
        $(settingCls).addClass('kitchen-setting__wrapper--show');
        $(sizeCls).addClass('kitchen-size__block--show');
        prevSetting = settingCls;
        prevSize = sizeCls;
    });

    $(kitchenSetting).click(function (e) {
        var target = e.target;
        var value = $(target).data('value');
        var setting = $(target).data('setting');
        switch (setting) {
            case 'sink':
                $(inputSettingSink).val(value);
                break
            case 'stove':
                $(inputSettingStove).val(value);
        }
    });

    $(kitchenSize).change(function (e) {
        var target = e.target;
        var value = $(target).val();
        var name = $(target).attr('name')

        if (isNaN(value)) {
            $(target).addClass('error');
            return false;
        }

        switch (name) {
            case 'size-top':
                $(inputBackSize).val(value + ' мм');
                break;
            case 'size-left':
                $(inputLeftSize).val(value + ' мм');
                break;
            case 'size-right':
                $(inputRightSize).val(value + ' мм');
        }
    });

    $(kitchenShelves).click(function (e) {
        var target = e.target;
        var value = $(target).val();
        $(inputShelves).val(value);
    });

    valid_number_phone('#phone');

    var sendData = function () {
        if (valid_number_phone('#phone')) {
            return false;
        } else {
            $('#thankyou').addClass('thankyou--show');
            $('#overlay').addClass('overlay--show');
            var dataString = '&material=' + $('#select-material').val() + '&format=' + $(inputFormat).val() + '&setting-sink=' + $(inputSettingSink).val() + '&setting-stove=' + $(inputSettingStove).val() + '&back-wall-size=' + $(inputBackSize).val() + '&left-wall-size=' + $(inputLeftSize).val() + '&right-wall-size=' + $(inputRightSize).val() + '&kitchen-shelves=' + $(inputShelves).val() + '&name=' + $('input[name=name]').val() + '&city=' + $('input[name=city]').val() + '&phone=' + $('input[name=phone]').val() + '&email=' + $('input[name=email]').val() + '&msg=' + $('textarea[name=msg]').val();
            $.ajax({
                type: "POST",
                url: "action.php", //Change
                data: dataString,
                success: function () {
                    console.log('ok')
                    $('#thankyou .thankyou__loading').css('display', 'none');
                    $('#thankyou .thankyou__text').css('display', 'block');
                    setTimeout(function () {
                        // Done Functions
                        $('#thankyou').removeClass('thankyou--show');
                        $('#overlay').removeClass('overlay--show');
                    }, 3000);
                }
            })
            return false;
        }
    }

    $(orderForm).submit(function (e) {
        e.preventDefault();
        sendData();
    });
}