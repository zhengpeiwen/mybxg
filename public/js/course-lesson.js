define(['jquery','template','util'], function ($,template,util) {
    //设置导航菜单选中
    util.setMenu('/course/add');
    //获取课程ID
    var csID=util.qs('cs_id');
    //获取所有课时列表数据
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csID},
        dataType:'json',
        success: function (data) {
            //解析数据 渲染页面
            var html=template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
        }
    });
});
