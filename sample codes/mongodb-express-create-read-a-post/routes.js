const database = require('./database.js')
const content = require("./create-content-script");


function run(app) {
    app.get('/', (req, res) => {
        res.send('Hello World')
    });

    app.get("/submitPost", (req, res) => {
        let title = content.getASentence(8),
            author = content.getCapitalWord(4),
            cont = content.getAParagraph(30);

        const submitFunc = database.addAPost(title, author, cont);

        database.run(submitFunc)
                .then(result => {       // still need to wait for the promise
                    console.log(result);

                    res.send(`New post created with the following id: ${result.insertedId}`);
                }) ;

        
    });


    app.get("/readPost/:title", (req, res, next) => {
        let title = req.params.title;
        console.log(title);

        const readFunc = database.readAPost(title);

        database.run(readFunc)
                .then(result => {
                    console.log(result);
                    res.send(result.content);
                    
                });

        
    });
}

module.exports = {
    run
}