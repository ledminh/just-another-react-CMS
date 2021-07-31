const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"
const dbName = "test"


async function run(func) {
    const  client = new MongoClient(uri);

    try {
       
        await client.connect();
        const db = client.db(dbName);
     

        return await func(db);

    }
    catch (e) {
        console.error(e);
    }
    finally {
        await client.close()
    }
}

function addAPost(title, author, content){
    const collectionName = "test-1";

    async function add(db) {
        const result = await db.collection(collectionName).insertOne({
            title: title,
            author: author,
            content: content,
            date_created: new Date()
        });

        
        return result;

    }

    return add;
}



function readAPost(title){
    const collectionName = "test-1";

    async function read(db){
        const result = await db.collection(collectionName).findOne({title: title});

        if(result) {
            return await result;
        }
        else {
            console.error("Post not found");
        }
    }

    return read;
}


function readAllPosts(){
    const collectionName = "test-1";

    async function read(db){
        const result = await db.collection(collectionName).find();

        if(result) {
            return await result.toArray();
        }
        else {
            console.error("Nothing found!!!");
        }
    }

    return read;
}


module.exports = {
    run,
    addAPost,
    readAPost,
    readAllPosts
};

