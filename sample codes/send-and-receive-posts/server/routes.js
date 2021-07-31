const database = require('./database.js')


function run(app, express) {
    
    app.use(express.static('../build'));

    app.get('/', (req, res) => {
        res.send('Hello World')
    });

    
    
    
    // This is for adding new entry to database received from react interface
    app.use(express.json());

    app.post("/post", (req, res) => {
        const submitFunc = database.addAPost(req.body.title, req.body.author, req.body.content);

        database.run(submitFunc)
                .then(result => {       // still need to wait for the promise

                    console.log(`New post created with the following id: ${result.insertedId}`);


                    res.sendStatus(200);
                }) ;
        

        
        
    });


    app.get("/all-posts", (req, res) => {
       

        const readAllFunc = database.readAllPosts();

        database.run(readAllFunc)
                .then(result => {                    
                    res.send(result);                    
                });

        
    });




}

module.exports = {
    run
}