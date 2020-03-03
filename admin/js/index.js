$(function() {
  // 2.获取用户信息
  $.ajax({
    type: "get",
    url: BigNew.user_info,
    // headers:{
    //   Authorization: localStorage.getItem('token')
    // },
    dataType: "json",
    success: function(response) {
      // console.log(response);
      $(".user_info span strong").html(response.data.nickname);
      $(".user_info img").attr("src", response.data.userPic);
      $(".user_center_link img").attr("src", response.data.userPic);
    }
  });
  // 目标2：用户退出功能 - 删除本地存储中的 token，并跳转回登录页
  $(".logout").click(function(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    location.href = "./login.html";
  });

  // 目标3：点击左侧选项卡高亮
  $('.level01').click(function (e) { 
    // e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    // 针对文章选项特殊处理：文章后面有二级菜单，二级菜单类名为 level02
    // 如何实现：
    //   1. 判断当前点击元素的下一个兄弟时候有 level02 的类名，如果有，就展开
    if($(this).next().hasClass('level02')){
      // 切换显示后面的二级菜单
      $(this).next().slideToggle();
      // 并且把自己身上的三角小图标切换个类名旋转一下, rotate0 在样式中已经有，直接使用即可
      $(this).find('b').toggleClass('rotate0');
      // 让默认第一个 li 是为选中状态的黄色
      // $(this).next().find('li').eq(0).addClass('active').siblings().removeClass('active');
      $(this).next().find('li').eq(0).children('a')[0].click();

    }else{
      // 如果点击的菜单没有二级菜单，
      // 就把原本展开的二级菜单的黄色选中状态去掉，告诉用户现在不在二级菜单里面了
      $('.level02 li').removeClass('active');
    }
  });

  // 二级菜单点击也能排他切换
  $('.level02 li').click(function (e) { 
    // e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    // $('.level01').eq(1).addClass('active').siblings().removeClass('active');
    //   $(this)      当前元素
    //   .parent()    父级元素
    //   .prev()      前一个元素
    //   .siblings()  兄弟元素
    $(this).parent().prev().addClass('active').siblings().removeClass('active');
  });

  // 需求修复1：左上角个人中心点击，左侧菜单中的个人中心高亮
  // 这里点击 a 标签的时候打开了个人中心页，但是左侧的菜单没有对应高亮，把高亮的指示补充上去。
  $('.user_center_link a').eq(0).click(function(){
    // 左侧个人中心高亮
    $('#user').addClass('active').siblings().removeClass('active');
    // 所有二级菜单的颜色去掉
    $('.level02 li').removeClass('active')
  })
});
