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


function readADoc(condition) {
    const collectionName = "test-1";

    async function read(db) {
        
        const result = await db.collection(collectionName).find(condition);

        if(result){
            return await result.toArray();
        }
        else {
            console.error("Doc not found!!!")
        }
    }

    return read;

}




module.exports = {
    run,
    readADoc
};

