const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect();

        // Delete all docs
        await deleteMultipleDocs(client, {time_created: {$lt: new Date()}});

        
        
        


        
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}


/******************************
 * DELETE DOCUMENTS
 */
 async function deleteMultipleDocs(client, condition) {
    const result = await client.db("test").collection("test-1").deleteMany(condition);

    console.log(`${result.deletedCount} document(s) was/were deleted.`);

   
}

main().catch(console.error)
