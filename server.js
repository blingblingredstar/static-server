const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]

if (!port) {
  console.log(`请指定端口号
  例如 node server.js 8888`)
  process.exit(1)
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathWithQuery = req.url
  let queryString = ''
  if (pathWithQuery.includes('?')) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = req.method

  console.log(`收到请求，路径（带查询参数）为: ${pathWithQuery}`)

  const dirPath = `./public`
  const filePath = dirPath + (path === '/' ? '/index.html' : path)

  const suffix = filePath.match(/\.[^\.]+$/)[0]
  const fileTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
  }

  res.statusCode = 200
  res.setHeader(
    'Content-Type',
    `${fileTypes[suffix] || 'text/html'};charset=utf-8`,
  )

  let content
  try {
    content = fs.readFileSync(filePath)
  } catch (e) {
    console.log(e)
    res.statusCode = 404
    content = '文件不存在'
  }

  res.write(content)
  res.end()
})

server.listen(port)

console.log(`监听 ${port}端口 成功
请打开 http://localhost:${port}`)
