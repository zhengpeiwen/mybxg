define(['jquery','cookie'], function($) {
	//实现登录功能
    $('#loginBtn').click(function(){
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            success: function(data) {
              console.log(data);
                if (data.code == 200) {
                	//存储用户登录之后信息
                	$.cookie('loginInfo',JSON.stringify(data.result),{
                			path:'/'
                	});
                	//登录成功，跳转主页面
                    location.href = '/main/index';
                }
            }
        });
        return false;//阻止默认行为
    });
});




