$(function(){
  // 2.获取用户信息
  $.ajax({
    type: "get",
    url: "http://localhost:8080/api/v1/admin/user/info",
    headers:{
      Authorization: localStorage.getItem('token')
    },
    dataType: "json",
    success: function (response) {
      console.log(response)
      $('.user_info span strong').html(response.data.nickname);
      $('.user_info img').attr('src',response.data.userPic);
      $('.user_center_link img').attr('src',response.data.userPic);
      $('.logout').click(function (e) { 
        e.preventDefault();
        localStorage.removeItem('token');
        location.href = './login.html'
      });
    }
  });
})