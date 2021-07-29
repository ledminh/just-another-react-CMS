const express = require('express')
const database = require('./database.js')


async function main() {
    const app = express()
    const port = 3001


   const readDocFunc = database.readADoc({time_created: {$lt: new Date()}});

   const result = await database.run(readDocFunc);

   console.log(result);

    app.get('/', (req, res) => {
        res.send('Hello World')
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}



main().catch(console.error);

