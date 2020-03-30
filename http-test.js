const http  = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为 json
  // res.setHeader('Content-Type', 'application/json')
  // 当使用 response.setHeader() 设置响应头时，它们将与传给 response.writeHead() 的任何响应头合并，其中 response.writeHead() 的响应头优先。
  res.writeHead(200, {'Content-Type': 'application/json'})

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }


  if(method === 'GET') {
    res.end(JSON.stringify(resData))
  } else if(method === 'POST') {
    // 接受数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', _ => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})
server.listen(3000, _ => {
  console.log('ok')
})