(function ($) {
    "use strict";

    $('#myStopClickButton').click(function(){
        $('.yvideo').each(function(){
            var el_src = $(this).attr("src");
            $(this).attr("src",el_src);
        });
    });


    $('input[name=url_video]').on('change', function () {
        let youtube = formatLinkYoutube($(this).val())
        $(this).val(youtube)
    });

    function formatLinkYoutube(youtubeURL) {
        const youtubeEmbedTemplate = 'https://www.youtube.com/embed/'
        const url = youtubeURL.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/)
        const YId = undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0]
        if (YId === url[0]) {
            console.log("not a youtube link")
            return youtubeURL
        } else {
            return youtubeEmbedTemplate.concat(YId)
        }

    }

    //<---------------- Shop Product ----------->>>>
    $(document).on('click', '#shopProductBtn', function (s) {
        let inputvideo = $('input[name=url_video]');
        inputvideo.val(formatLinkYoutube(inputvideo.val()))

        s.preventDefault();
        var element = $(this);

        element.attr({'disabled': 'true'});
        element.find('i').addClass('spinner-border spinner-border-sm align-middle mr-1');

        (function () {

            $("#shopProductForm").ajaxForm({
                dataType: 'json', error: function (responseText, statusText, xhr, $form) {
                    element.removeAttr('disabled');

                    if (!xhr) {
                        xhr = '- ' + error_occurred;
                    } else {
                        xhr = '- ' + xhr;
                    }

                    $('.popout').removeClass('popout-success').addClass('popout-error').html(error_oops + ' ' + xhr + '').fadeIn('500').delay('5000').fadeOut('500');
                    element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                }, success: function (result) {

                    //===== SUCCESS =====//
                    if (result.success && result.url) {
                        window.location.href = result.url;

                    } else if (result.success && result.buyCustomContent) {

                        $('#buyNowForm').modal('hide');

                        swal({
                            title: thanks, text: purchase_processed_shortly, type: "success", confirmButtonText: ok
                        });

                        element.removeAttr('disabled');
                        element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');

                        $('#errorShopProduct').hide();
                        $('.balanceWallet').html(result.wallet);
                        $('#descriptionCustomContent').val('');

                    } else {
                        var error = '';
                        var $key = '';

                        for ($key in result.errors) {
                            error += '<li><i class="fa fa-times-circle"></i> ' + result.errors[$key] + '</li>';
                        }

                        $('#showErrorsShopProduct').html(error);
                        $('#errorShopProduct').fadeIn(500);

                        element.removeAttr('disabled');
                        element.find('i').removeClass('spinner-border spinner-border-sm align-middle mr-1');
                    }
                }//<----- SUCCESS
            }).submit();
        })(); //<--- FUNCTION %
    });//<<<-------- * END FUNCTION CLICK * ---->>>>

    $(document).on('click', '.actionDeleteItem', function (e) {

        e.preventDefault();

        var element = $(this);
        var form = $(element).parents('form');
        element.blur();

        swal({
            title: delete_confirm,
            type: "error",
            showLoaderOnConfirm: true,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: yes_confirm,
            cancelButtonText: cancel_confirm,
            closeOnConfirm: false,
        }, function (isConfirm) {

            if (isConfirm) {
                (function () {
                    form.ajaxForm({
                        dataType: 'json', success: function (response) {
                            if (response.success) {
                                window.location.href = response.url;
                            } else {
                                swal({
                                    type: 'info', title: error_oops, text: error_occurred,
                                });
                            }
                        }, error: function (responseText, statusText, xhr, $form) {
                            // error
                            swal({
                                type: 'error', title: error_oops, text: '' + error_occurred + ' (' + xhr + ')',
                            });
                        }
                    }).submit();
                })(); //<--- FUNCTION %
            } // isConfirm
        });
    });// End Delete


})(jQuery);
