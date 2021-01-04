$(function() {

    let post;

    $('#button1').click(function() {

        const o_username = $('#login_field').val().trim();
        const o_email = $('#email_filed').val().trim();
        const o_password = $('#password_field').val().trim();

        if(!o_username || !o_password) {
            alert('Username or Password should not be empty.');
            return false;
        }
        const rule = /[^A-Za-z0-9]+/;
        if(!((o_password.length > 6) && (rule.test(o_password) === true) || (o_password.length >= 10))) {
            alert('Make sure the password is at least 10 characters OR at least 6 characters including special letter.');
            return false;
        }
        const rule2 = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (rule2.test(o_email) === false) {
            alert('Must enter a valid mail address.')
            return false;
        }

        const h_username = '' + CryptoJS.HmacSHA256(o_username, 'justSecretKey1');
        const h_email = '' + CryptoJS.HmacSHA256(o_email, 'justSecretKey2');
        const h_password = '' + CryptoJS.HmacSHA256(o_password, 'justSecretKey3');

        const obj_e = {
            h_username,
            h_email,
            h_password
        };

        document.getElementById("formBody").style.display="none";
        document.getElementById("vary1").style.display="inline";

        post = {
            type: 'POST',
            url: '/data/signUp',
            data: obj_e,
            dataType: 'json',
            success: function(data) {
                if(data.status){
                    alert('sign up success.');
                    window.location.href = '/signIn';
                }else{
                    alert(data.info);
                    window.location.href = '/signUp';
                }
            },
            error: function() {
                alert('sign up failed.');
            }
        }
    });

    $('#vary1').slideVerify({
        type : 2,   //类型
        vOffset : 4,  //误差量
        vSpace : 5, //间隔
        imgName : ['1.jpg', '2.jpg'],
        imgSize : {
            width: '400px',
            height: '200px',
        },
        blockSize : {
            width: '40px',
            height: '40px',
        },
        barSize : {
            width : '400px',
            height : '40px',
        },
        ready : function() {
        },
        success : function() {
            $.ajax(post);
        },
        error : function() {
        }
    });
});