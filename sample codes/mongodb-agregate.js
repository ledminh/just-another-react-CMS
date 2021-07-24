const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect();

        const pipeline = [
            {
              '$group': {
                '_id': '$title', 
                'average_age': {
                  '$avg': '$age'
                }
              }
            }, {
              '$sort': {
                'average_age': 1
              }
            }, {
              '$limit': 3
            }
        ]
        

        const aggCursor = client.db("test").collection("test-1").aggregate(pipeline);

        await aggCursor.forEach(entry => console.log(entry));
        
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

main().catch(console.error)
