$(function() {
    $('#button2').click(function() {
        const o_username = $('#login_field').val().trim();
        const o_password = $('#password').val().trim();
        if(!o_username || !o_password) {
            alert('Username or Password should not be empty.');
            return false;
        }

        const h_username = '' + CryptoJS.HmacSHA256(o_username, 'justSecretKey1');
        const h_password = '' + CryptoJS.HmacSHA256(o_password, 'justSecretKey3');
        const obj_e = {
            h_username,
            h_password
        };

        $.ajax({
            type: 'GET',
            url: '/data/signIn',
            data: obj_e,
            dataType: 'json',
            success: function(data) {
                if(data.status){
                    window.location.href = '/homepage';
                }else{
                    alert(data.info);
                    window.location.href = '/signIn';
                }
            },
            error: function() {
                alert('sign in error.');
            }
        });
    });
});