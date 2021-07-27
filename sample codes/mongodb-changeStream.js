const MongoClient = require('mongodb').MongoClient

const stream = require('stream')


async function main() {
    //const uri = "mongodb://localhost:27017"
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"
    const client = new MongoClient(uri)

    try {
        await client.connect();

        //monitorCollectionUsingEventEmitter(client);
       //monitorCollectionUsingHasNext(client);
       
       monitorCollectionUsingStreamAPI(client);
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}



function closeChangeStream(timeInMs = 60000, changeStream){
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Closing the change stream");
            changeStream.close();
            resolve();
        }, timeInMs)
    })
}

async function monitorCollectionUsingEventEmitter(client, timeInMs = 30000, pipeline = []) {
    const collection = client.db("test").collection("test-2");

    const changeStream = collection.watch();
    
    const changeListener = (next) => console.log(next);

    changeStream.on("change", changeListener);

    await closeChangeStream(timeInMs, changeStream);
}

async function monitorCollectionUsingHasNext(client, timeInMs=5000, pipeline = []){
    const collection = client.db("test").collection("test-2");

    const changeStream = collection.watch();

    await closeChangeStream(timeInMs, changeStream);

    try {
        while (await changeStream.hasNext()){
            console.log(await changeStream.next());
        } 
        
    }
    catch (error) {
        if(changeStream.isClosed) {
            console.log("The change stream is closed. Will not wait on any more changes.")
        } else {
            throw error;
        }

    }
}

async function monitorCollectionUsingStreamAPI(client, timeInMs=60000, pipeline=[]){
    const collection = client.db("test").collection("test-2");
    const changeStream = collection.watch(pipeline);

    changeStream.stream().pipe(
        new stream.Writable({
            objectMode: true,
            write: function(doc, _, cb) {
                console.log(doc);
                cb;
            }
        })
    )
    
    await closeChangeStream(timeInMs, changeStream);
}

main().catch(console.error)
