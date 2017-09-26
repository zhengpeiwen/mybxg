define(['jquery','template','util','uploadify','jcrop','form'], function ($,template,util) {
    //设置导航菜单选中
   util.setMenu('/course/add');
    //获取课程ID
    var csId=util.qs('cs_id');
    //查询课程封面信息
    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        dataType:'json',
        success: function (data) {
            var html=template('pictureTpl',data.result);
            $('#pictureInfo').html(html);
            //处理封面上传
            $('#myfile').uploadify({
                width:80,
                height:'auto',
                buttonText:'选择图片',
                itemTemplate:'<span></span>',
                buttonClass:'btn btn-success btn-sm',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess: function (a,b) {
                    var obj=JSON.parse(b.trim());
                    console.log(obj.result.path);
                    $('.preview img').attr('src',obj.result.path);
                    cropImage();
                    $("#cropBtn").text('保存图片').attr('data-flag',true);


                }
            });
            //选中图片
            var img=$('.preview img');
            //图片裁切功能
            $('#cropBtn').click(function () {
                var flag=$(this).attr('data-flag');
                console.log(flag);
                if(flag){
                    //提交页面
                    console.log(3);
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csId},
                        dataType:'json',
                        success: function (data) {
                            if(data.code==200){
                                //location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                }else{
                    //第一次点击按钮
                    $(this).text('保存图片').attr('data-flag',true);
                    //实现图片裁切功能
                    cropImage();
                }
            });
            //封装一个图片裁切功能能
            function cropImage(){
                img.Jcrop({
                   aspectRatio:2
                }, function (){
                $('.thumb').html('');
                    //显示缩略图
                    this.initComponent('Thumbnailer',{width:240,height:120,mythumb:'.thumb'});

                    //获取图片的宽度和高度
                    var width=this.ui.stage.width;
                    var height=this.ui.stage.height;
                    //计算选区的数据
                    var x=0;
                    var y=(height-width/2)/2;
                    var w=width;
                    var h=width/2;
                    //创建一个选区
                    this.newSelection();
                    this.setSelect([x,y,w,h]);

                });

            }
            //监控选区的变化
            img.parent().on('cropstart cropmove cropend', function (a,b,c) {
                console.log(c);
                //选区完成和变化时把对应的坐标填充到表单中
                var aInput=$('#cropForm').find('input');
                aInput.eq(0).val(c.x);
                aInput.eq(1).val(c.y);
                aInput.eq(2).val(c.w);
                aInput.eq(3).val(c.h);
            });
        }
    });

});