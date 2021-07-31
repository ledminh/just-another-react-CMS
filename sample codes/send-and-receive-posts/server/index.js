const express = require('express')

const routes = require('./routes')

async function main() {
    const app = express()
    const port = 3001;

    
   

    routes.run(app, express);
    
    
    
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}



main().catch(console.error);
