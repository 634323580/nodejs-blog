const loginCheck = (username, password) => {
  // 先试用假数据
  if(username === '张三' && password === '123') {
    return true
  } else {
    return false
  }
}

module.exports = {
  loginCheck
}