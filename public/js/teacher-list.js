define(['jquery','template'], function ($,template) {
    //���ú�̨�ӿڻ�ȡ���еĽ�ʦ����
    $.ajax({
        type:'get',
        url:'/api/teacher',
        dataType:'json',
        success:function(data){
            //�������ݣ���Ⱦҳ��
            var html =template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }
    });
});
