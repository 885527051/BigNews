$(function(){
  // 功能1：查询个人信息
  // #### 3、获取用户详情
  // 请求地址：/admin/user/detail
  // 请求方式：get
  // 请求参数：无

  $.ajax({
    type: "get",
    url: BigNew.user_detail,
    dataType: "json",
    success: function (response) {
      // console.log(response);
      // 从后端返回的 response 对象中获取用户信息
      // const nickname = response.data.nickname;
      // const email = response.data.email;
      // const password = response.data.password;
      // const username = response.data.username;
      // 把用户信息分别写入到表单的 input 标签中
      // $('input.username').val(username);
      // $('input.nickname').val(nickname);
      // $('input.email').val(email);
      // $('input.password').val(password);

      const obj = response.data;
      // // for in            用于遍历对象 - 补充
      // // input.类名        交集选择器
      for(let key in obj){
        // console.log(key);
        // console.log(obj[key]);
        // key          就是对象的键名称
        // obj[key]     就是通过对象的键名称获取到值
        $(`input.${key}`).val(obj[key]);
      }
      const userPic = response.data.userPic;
      // 图片特殊处理，需要通过 src 属性设置图片路径
      // img.user_pic    img 和 .user_pic 连在一起是交集选择器
      // 交集选择器：既要求是 img 标签，身上还要求有 .user_pic 的类名
      $('img.user_pic').attr('src', userPic);
    }
  });

  // 功能2：jq 实现本地图片预览 - 还没有上传，只是本地查看而已
  //    .change()    就是表单当值改变的时候触发的事件
  //    this         事件源，this 原生对象，$(this) 才是 JQ 对象
  //    .files       文件列表，伪数组格式，通过索引值获取上传的一张图片
  //    URL.createObjectURL()    把获取缓存文件的路径
  $('#exampleInputFile').change(function(){
    // console.log(this);
    // console.log(this.files);
    // console.log(this.files[0]);
    // 在上传按钮中获取到上传的文件对象
    const imgFile = this.files[0];
    // 获取浏览器本地缓存中的文件的路径(特殊路径)
    const imgUrl = URL.createObjectURL(imgFile);
    // console.log(imgUrl)
    // 把路径设置到图片中就可实现预览
    $('img.user_pic').attr('src', imgUrl)
  });

  // 功能3：点击修改按钮，修改了用户信息
  // 知识点：FormData
  // FormData 可以把它看做是特殊的参数数据格式。
  //  在 xhr1 阶段，ajax 常用于提交字符串格式数据。
  //  在 xhr2 阶段，FormData 可用于图片上传，对象格式。
  //  用法：new FormData(原生表单域)  可以把表单中的数据自动序列化
  $('.btn-edit').click(function (e) { 
    e.preventDefault();
    // console.dir(this);
    // console.dir(this.form);
    // 2、通过 FormData 把表单中的数据自动添加到 FormData 对象中，可直接用于上传
    // this 代表当前点击的按钮
    // PS：每个表单元素，都可以通过 this.form 获取它所在的表单域元素
    const fd = new FormData(this.form);
    // 3、通过 ajax 把新的用户信息上传到服务器
    $.ajax({
      type: "post",
      url: BigNew.user_edit,
      data: fd,
      // 不需要要自动添加 contentType 请求头，fd 对象有自己的请求头
      contentType: false,
      // 不需要把 fd 对象转换成字符串
      processData: false,
      dataType: "json",
      success: function (response) {
        console.log(response)
        //  知识点：
        //    iframe 中的页面，window 对象是指 iframe 页面中的 window 对象
        //    如果想要获取到 iframe 的父级页面，可以通过 window.parent
        //    window.parent 要通过 http 协议方式才能正常获取父页面
        if(response.code === 200){
          //  方案1：刷新父级页面 - 体验不好
          // window.parent.location.reload();

          //  方案2：通过 window.parent.$() 选中父级页面元素并修改
          // 获取当前 iframe 中的预览图，和 input.nickname 的值
          const imgSrc = $('img.user_pic').attr('src');
          const nickname = $('input.nickname').val();
          console.log(imgSrc)
          console.log(nickname)
          // 修改父级页面中的图片
          // window.parent.$() 操作的就是父级页面的元素
          window.parent.$('.user_info img,.user_center_link img').attr('src', imgSrc);
          // window.parent.$('.user_info img').attr('src', imgSrc);
          // window.parent.$('.user_center_link img').attr('src', imgSrc);
          window.parent.$('.user_info strong').html(nickname);
        }
      }
    });
  });
})