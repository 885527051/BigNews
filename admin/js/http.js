/* 沙箱模式 */
(function(w) {
  $.ajaxSetup({
    headers: {
      Authorization: localStorage.getItem("token")
    },
    // 发送 ajax 请求前 - 作业：添加请求进度条
    beforeSend: function() {
      // 3. 显示加载条
      if(window.NProgress){
        NProgress.start();
      }
    },
    // 请求失败，意味服务器拒绝给你数据，造成这个原因往往是用户没有没有正确的 token
    // 没有正确的 token 就跳到登录页，让用户重新登录并获取 token
    error: function() {
      $(".modal").modal();
      $(".modal p").html("数据获取失败，请重新登录");
      // 点击去登录的按钮后跳转到登录页
      $(".btn-default").click(function(e) {
        e.preventDefault();
        location.href = "./login.html";
      });
    },
    complete: function(e) {
      // 4. 隐藏加载条
      if(window.NProgress){
        NProgress.done();
      }
    }
  });

  // 需求2：把所有的 ajax 请求的 url 地址封装到一个对象中管理
  // 基地址，注意这里不要写多了斜杠
  const baseUrl = "http://localhost:8080/api/v1";
  // user_login: `${baseUrl}/admin/user/login`,
  // 拼接好的 url 放到一个对象中管理
  const BigNew = {
    // 用户登录
    user_login: `${baseUrl}/admin/user/login`,
    // 用户信息接口
    user_info:       `${baseUrl}/admin/user/info`,        // 2、获取用户信息
    user_detail:     `${baseUrl}/admin/user/detail`,      // 3、获取用户详情
    user_edit:       `${baseUrl}/admin/user/edit`,        // 4、编辑用户信息
    // 分类接口
    category_list:   `${baseUrl}/admin/category/list`,    // 5、所有文章类别
    category_add:    `${baseUrl}/admin/category/add`,      // 6、新增文章类别
    category_search: `${baseUrl}/admin/category/search`,   // 7、根据id查询指定文章类别
    category_edit:   `${baseUrl}/admin/category/edit`,     // 8、编辑文章类别
    category_delete: `${baseUrl}/admin/category/delete`,   // 9、删除文章类别
    // 文章接口
    article_query:   `${baseUrl}/admin/article/query`,      // 10、文章搜索
    article_publish: `${baseUrl}/admin/article/publish`,    // 11、发布文章
    article_search:  `${baseUrl}/admin/article/search`,    // 12、根据id获取文章信息
    article_edit:    `${baseUrl}/admin/article/edit`,      // 13、文章编辑
    article_delete:  `${baseUrl}/admin/article/delete`,     // 14、删除文章
    // 数据统计接口
    data_info:       `${baseUrl}/admin/data/info`,     // 15、获取统计数据
    data_article:    `${baseUrl}/admin/data/article`,     // 16、日新增文章数量统计
    data_category:   `${baseUrl}/admin/data/category`,     // 17、各类型文章数量统计
    data_visit:      `${baseUrl}/admin/data/visit`,     // 18、日文章访问量
    // 评论接口
    comment_search:  `${baseUrl}/admin/comment/search`,     // 19、文章评论搜索
    comment_pass:    `${baseUrl}/admin/comment/pass`,       //  20、评论审核通过
    comment_reject:  `${baseUrl}/admin/comment/reject`,     // 21、评论审核不通过
    comment_delete:  `${baseUrl}/admin/comment/delete`,     // 22、删除评论
}

  // 把局部的 BigNew 添加到 window 对象上
  w.BigNew = BigNew;

  // var baseURL = 'http://localhost:8080/api/v1'
  // var BigNew = {
  //     baseURL:baseURL,//基地址
  //     user_login:      baseURL + '/admin/user/login',//用户登录
  //     user_info:       baseURL + '/admin/user/info',//用户信息
  //     user_detail:     baseURL + '/admin/user/detail',//用户详情
  //     user_edit:       baseURL + '/admin/user/edit',//用户编辑
  //     category_list:   baseURL + '/admin/category/list',//文章类别查询
  //     category_add:    baseURL + '/admin/category/add',//文章类别新增
  //     category_search: baseURL + '/admin/category/search',//文章类别搜索
  //     category_edit:   baseURL + '/admin/category/edit',//文章类别编辑
  //     category_delete: baseURL + '/admin/category/delete',//文章类别删除
  //     article_query:   baseURL + '/admin/article/query',//文章搜索
  //     article_publish: baseURL + '/admin/article/publish',//文章发布
  //     article_search:  baseURL + '/admin/article/search',//文章信息查询
  //     article_edit:    baseURL + '/admin/article/edit',//文章编辑
  //     article_delete:  baseURL + '/admin/article/delete',//文章删除
  //     comment_list:    baseURL + '/admin/comment/search',//文章评论列表
  //     comment_pass:    baseURL + '/admin/comment/pass',//文章评论通过
  //     comment_reject:  baseURL + '/admin/comment/reject',//文章评论不通过
  //     comment_delete:  baseURL + '/admin/comment/delete',//文章评论删除
  // };

  // //暴露接口
  // w.BigNew = BigNew;
})(window);
