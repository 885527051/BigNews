$(function() {
  // 封装：获取到列表数据并渲染到页面中
  function getListRender() {
    // #### 5、所有文章类别
    // 请求地址：/admin/category/list
    // 请求方式：get
    $.ajax({
      type: "get",
      url: BigNew.category_list,
      // data: "data",
      dataType: "json",
      success: function(response) {
        // 3 准备数据，ajax 请求成功那就是数据准备好了
        console.log(response);
        // 4 调用模板 - template('id名称', 数据)
        const htmlStr = template("list", response);
        // 5 渲染页面
        $("tbody").html(htmlStr);
      }
    });
  }

  // 调用：页面加载的时候先获取一次数据并渲染
  // 目标1：分类数据获取
  getListRender();

  // 目标2：分类数据新增
  // 给新增分类按钮绑定点击事件
  $("#xinzengfenlei").click(function(e) {
    // e.preventDefault();
    // 显示模态框
    $("#myModal").modal();
    const str = $(this)
      .text()
      .trim();
    // 通过 eq(1) 找到第二个按钮
    // .text() 修改按钮的文本
    // .attr() 把原本按钮的类名覆盖掉，变绿色
    // .addClass()  这里不要添加类名，会受到样式层叠的影响
    $(".modal-footer button")
      .eq(1)
      .text(str)
      .attr("class", "btn btn-success");
  });

  // 需求：隐藏模态框的时候，就清空掉表单数据，方便下一次操作
  $("#myModal").on("hide.bs.modal", function(e) {
    // $('form')[0]    把 JQ 对象转换成原生对象
    // .reset()        清空表单内容(DOM 表单的方法，原生的)
    $("form")[0].reset();
  });

  // 目标3：分类数据修改(编辑)
  //  3.1 通过事件委托实现编辑按钮的事件绑定
  // jq 事件委托的写法：
  // $('父级元素选择器').on('事件类型','子元素选择器',function(){ });
  $("table").on("click", ".btn-info", function() {
    // 获取当前点击按钮上的自定义属性 data-id
    const id = $(this).attr("data-id");
    // alert(id);
    // 1. 弹出模态框
    $("#myModal").modal();
    // 2. 把模态框中的提交按钮文字改成<编辑>并改变<颜色>
    $(".modal-footer button").eq(1).text("编辑").attr("class", "btn btn-info").attr("data-id", id);
    // 3. !!! 把原编辑按钮的 id 以自定义属性方式添加到模态框的编辑按钮上。(修改那个数据)
    // 4. 把数据编辑按钮所在 tr 的数据填充到表单中输入框中
    // tr 的第一个孩子是 name 的值
    // console.log(this);
    // console.log($(this).parents('tr'));
    // console.log($(this).parents('td').siblings().eq(0).text());
    const name = $(this).parents("tr").children().eq(0).text().trim();
    // $(this).parents('tr').children().eq(0).text().trim();

    const slug = $(this).parents("td").siblings().eq(1).text().trim();

    // 把编辑按钮对应的分类数据的值，填充到输入框里面
    $("form input").eq(0).val(name);
    $("form input").eq(1).val(slug);
  });

  // 模态框第二个按钮绑定事件。
  //   内部需要分支实现两个功能：
  //      功能1：新增文章分类操作
  //      功能2：编辑文章分类操作
  $('.modal-footer button').eq(1).click(function(){
    // 功能1：新增文章分类操作
    if($(this).text().trim() === '新增分类'){
      $.ajax({
        type: "post",
        // 从 http.js 中获取链接
        url: BigNew.category_add,
        data: {
          // 获取表单中的两个 input 输入框的值作为参数
          name: $('form input').eq(0).val().trim(),
          slug: $('form input').eq(1).val().trim(),
        },
        dataType: "json",
        success: function (response) {
          // console.log(response);
          // 如果新增成功， code 值是 201
          if(response.code === 201){
            // 隐藏模态框
            $('#myModal').modal('hide');
            // 调用之前封装好的方法，重新获取分类列表并渲染
            getListRender();
          }
        }
      });
    }else{
      // 功能2：编辑分类的操作也写这里
      $.ajax({
        type: "post",
        url: BigNew.category_edit,
        // 注意获取到正确的参数
        data: {
          // name: form 表单的第一个 input 的值
          name: $('form input').eq(0).val().trim(),
          // slug: form 表单的第二个 input 的值
          slug: $('form input').eq(1).val().trim(),
          // id: 编辑按钮上的 data-id 自定义属性的值
          id: $('.modal-footer button').eq(1).attr('data-id'),
        },
        dataType: "json",
        success: function (response) {
          console.log(response);
          if(response.code === 200){
            // 隐藏模态框
            $('#myModal').modal('hide');
            // 文章分类数据重新渲染
            getListRender();
          }
        }
      });
    }
  })

  // 目标4：分类数据删除
  // 由于删除按钮也是动态生成的,所以需要用事件委托方式绑定事件
  $('table').on('click','.btn-danger',function(){
    // 1. 获取当前点击的删除按钮上的 data-id 的值（用于ajax实现删除的）
    const id = $(this).attr('data-id');
    // alert(id);
    // 2. 通过 ajax 发送请求，在数据库中删除分类数据
    $.ajax({
      type: "post",
      url: BigNew.category_delete,
      data: {
        id: id
      },
      dataType: "json",
      success: function (response) {
        // 3. 重新获取分类数据并渲染(目标1的时候已经封装好了，调用即可)
        getListRender();
        alert(response.msg);
      }
    });
  })
});
