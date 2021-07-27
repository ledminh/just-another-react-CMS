const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect();

        const test_2 = client.db("test").collection("test-2");

        
        const result = await test_2.insertOne({
            name: "Insert first time",
            count: Math.random()*10,
            time_updated: new Date()
        });

        
        //await test_2.updateMany({count: 0}, {$set: {name: "Insert second time"}});

        console.log(result);

        /*
        const resultDel = await test_2.deleteMany({count: 0});
        
        console.log(resultDel);*/
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

main().catch(console.error)

