define(['jquery','template'], function ($,template) {
    //���ýӿ� ��ȡ���еĸ�����Ϣ
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success: function (data) {
            //�������� ��Ⱦҳ��
            var html=template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
        }
    });
});
