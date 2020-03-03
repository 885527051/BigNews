$(function(){
  // 1、用户登录
  $('.input_sub').click(function (e) { 
    e.preventDefault();
    
    const user = $('.input_txt').val().trim();
    const pwd = $('.input_pass').val().trim();

    if(user === '' || pwd === ''){
      $('.modal-title').html('温馨提示')
      $('.modal-body p').html('账号密码不能为空')
      $('.modal').modal()
    }else{
      $.ajax({
        type: "post",
        url: BigNew.user_login,
        data: {
          username: user,
          password: pwd
        },
        dataType: "json",
        success: function (response) {
          console.log(response)
          if(response.code === 200){
            // alert(response.msg)
            localStorage.setItem('token',response.token)

            location.href = './index.html'
          }else{
            $('.modal-title').html('温馨提示')
            $('.modal-body p').html(response.msg)
            $('.modal').modal()
          }
        }
      });
    }
  });
})