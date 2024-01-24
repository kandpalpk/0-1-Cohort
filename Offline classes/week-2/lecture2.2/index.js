const express = require('express')
const app = express()
const port = 3000
//
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//***TODO APP where we can store data in a file.
// Try creating an http server using c from scratch(optional)
//create a golang/rust/java http server.(read through it)
