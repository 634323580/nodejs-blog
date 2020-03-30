const getList = (auth, keyword) => {
  // 先返回假数据 （格式是正确的）
  return [{
    id: 1,
    title: '标题',
    content: '内容',
    createTime: Date.now(),
    author: '张三'
  },{
    id: 2,
    title: '标题2',
    content: '内容',
    createTime: Date.now(),
    author: '李四'
  }]
}

const getDetail = (id) => {
  // 先返回假数据 （格式是正确的）
  return {
    id: 1,
    title: '标题',
    content: '内容',
    createTime: Date.now(),
    author: '张三'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3 // 表示新建博客，插入数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const delBlog = (id) => {
  console.log(id)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}