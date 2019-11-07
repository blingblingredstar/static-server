console.log('2.js')

const xhr = new XMLHttpRequest()
xhr.open('GET', 'http://localhost:8888/4.json')
xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const res = xhr.responseText
    console.log(JSON.parse(res))
  }
}
xhr.send()
