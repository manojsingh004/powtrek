//<--------- Start Payment -------//>
(function ($) {
    "use strict";
    $('button[id=updateMethod]').on('click', function (e) {
        $('#formas-pagamentos').children().each(function (e, da) {
            $('#' + da.id).css("display", "block");
        })
    })

    $('input[name=payment_gateway]').on('click', function (e) {
        const tipoPagamento = $(this).val();
        $('#updateMethod').css("display", "block");

        if (tipoPagamento === 'Pix') {
            $('#tip_radio_' + tipoPagamento).css("display", "none");
        } else if (tipoPagamento === 'Bank') {
            $('#tip_radio_' + tipoPagamento).css("display", "none");
        }

        $('#formas-pagamentos').children().each(function (e, da) {
            let dasd = da.id
            if (dasd !== 'tip_radio_' + tipoPagamento) {
                $('#' + dasd).css("display", "none");
            }
        })

        if ($(this).val() === 'Bank') {
            $('#bankTransferBox').slideDown();
            $('#bankTransferBox_pix').slideUp();
            $('#tip_radio_pix').css("display", "none");

        } else if ($(this).val() === 'Pix') {
            $('#bankTransferBox_pix').slideDown();
            $('#bankTransferBox').slideUp();
        } else {
            $('#bankTransferBox').slideUp();
            $('#bankTransferBox_pix').slideUp();
        }

    });


    //======= FILE Bank Transfer
    $("#fileBankTransfer").on('change', function () {

        $('#previewImage').html('');

        var loaded = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
//check empty input filed
            if ($(this).val()) {
                var oFReader = new FileReader(),
                    rFilter = /^(?:image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/png|image)$/i;
                if ($(this)[0].files.length === 0) {
                    return
                }

                var oFile = $(this)[0].files[0];
                var fsize = $(this)[0].files[0].size; //get file size
                var ftype = $(this)[0].files[0].type; // get file type

                if (!rFilter.test(oFile.type)) {
                    $('#fileBankTransfer').val('');
                    swal({
                        title: error_oops, text: formats_available_images, type: "error", confirmButtonText: ok
                    });
                    return false;
                }

                var allowed_file_size = file_size_allowed_verify_account;

                if (fsize > allowed_file_size) {
                    $('.popout').addClass('popout-error').html(max_size_id_lang).fadeIn(500).delay(4000).fadeOut();
                    $(this).val('');
                    return false;
                }

                $('#previewImage').html('<i class="fas fa-image text-info"></i> <strong>' + oFile.name + '</strong>');


            }
        } else {
            alert('Can\'t upload! Your browser does not support File API! Try again with modern browsers like Chrome or Firefox.');
            return false;
        }
    });
    //======= END FILE Bank Transfer

    //======= FILE PIX Transfer
    $("#filePixTransfer").on('change', function (e) {

        $('#previewImagePix').html('');

        var loaded = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //check empty input filed
            if ($(this).val()) {
                var oFReader = new FileReader(),
                    rFilter = /^(?:image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/png|image)$/i;
                if ($(this)[0].files.length === 0) {
                    return
                }

                var oFile = $(this)[0].files[0];
                var fsize = $(this)[0].files[0].size; //get file size
                var ftype = $(this)[0].files[0].type; // get file type

                if (!rFilter.test(oFile.type)) {
                    $('#filePixTransfer').val('');
                    swal({
                        title: error_oops, text: formats_available_images, type: "error", confirmButtonText: ok
                    });
                    return false;
                }

                var allowed_file_size = file_size_allowed_verify_account;

                if (fsize > allowed_file_size) {
                    $('.popout').addClass('popout-error').html(max_size_id_lang).fadeIn(500).delay(4000).fadeOut();
                    $(this).val('');
                    return false;
                }

                $('#previewImagePix').html('<i class="fas fa-image text-info"></i> <strong>' + oFile.name + '</strong>');

            }
        } else {
            alert('Can\'t upload! Your browser does not support File API! Try again with modern browsers like Chrome or Firefox.');
            return false;
        }
    });
    //======= END FILE Pix Transfer


    //<---------------- Pay tip ----------->>>>
    $(document).on('click', '#addFundsBtn', function (s) {

        s.preventDefault();
        var element = $(this);
        var form = $(this).attr('data-form');
        element.attr({'disabled': 'true'});
        var payment = $('input[name=payment_gateway]:checked').val();
        element.find('i').addClass('spinner-border spinner-border-sm align-middle mr-1');

        (function () {
            $('#formAddFunds').ajaxForm({
                dataType: 'json', success: function (result) {

                    // success
                    if (result.success && result.instantPayment) {
                        window.location.reload();
                    }

                    if (result.success == true && result.insertBody) {

                        $('#bodyContainer').html('');

                        $(result.insertBody).appendTo("#bodyContainer");

                        if (payment != 1 && payment != 2) {
                            element.removeAttr('disabled');
                            element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                        }

                        $('#errorAddFunds').hide();

                    } else if (result.success == true && result.status == 'pending') {

                        swal({
                            title: thanks, text: result.status_info, type: "success", confirmButtonText: ok
                        });

                        $('#formAddFunds').trigger("reset");
                        element.removeAttr('disabled');
                        element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                        $('#previewImage').html('');
                        $('#previewImagePix').html('');
                        $('#handlingFee, #total, #total2').html('0');
                        $('#bankTransferBox').hide();
                        $('#bankTransferBox_pix').hide();

                    } else if (result.success == true && result.url) {
                        window.location.href = result.url;
                    } else {

                        if (result.errors) {

                            var error = '';
                            var $key = '';

                            for ($key in result.errors) {
                                error += '<li><i class="far fa-times-circle"></i> ' + result.errors[$key] + '</li>';
                            }

                            $('#showErrorsFunds').html(error);
                            $('#errorAddFunds').show();
                            element.removeAttr('disabled');
                            element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                        }
                    }

                }, error: function (responseText, statusText, xhr, $form) {
                    // error
                    element.removeAttr('disabled');
                    element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                    swal({
                        type: 'error', title: error_oops, text: error_occurred + ' (' + xhr + ')',
                    });
                }
            }).submit();
        })(); //<--- FUNCTION %
    });//<<<-------- * END FUNCTION CLICK * ---->>>>
//============ End Payment =================//

})(jQuery);
