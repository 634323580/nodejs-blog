const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 异步获取postData
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if(req.method !== 'POST') {
      resolve({})
      return
    }
    if(req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    // 接受数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', _ => {
      if(!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
  return promise
}

const serverHandle = (req, res) => {

  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  // 设置返回格式
  res.setHeader('Content-Type', 'application/json')

  // 处理postData
  getPostData(req)
  .then(postData => {
    req.body = postData
    // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if(blogData) {
      res.end(JSON.stringify(blogData))
      return
    }

    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    if(userData) {
      res.end(JSON.stringify(userData))
      return
    }

    // 未命中路由，返回404
    res.writeHead(404, {"Content-Type": 'text/plain'})
    res.write("404 Nor Found\n")
    res.end()
  })
}

module.exports = serverHandle


// process.env.NODE_ENV