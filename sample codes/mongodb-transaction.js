const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect();

        const test_1_collection = client.db("test").collection("test-1");
        const test_2_collection = client.db("test").collection("test-2");

        test_2_collection.insertOne({
            name: "User 1",
            justANumber: 0,
            updated: "Not now"
        }          
        );


       


        const session = client.startSession();


        const transactionOptions = {
            readPreference: 'primary',        
            readConcern: { level: 'local' },        
            writeConcern: { w: 'majority' }        
        };

        try {
            const transactionResults = await session.withTransaction(async () => {
                test_2_collection.updateOne({name: "User 1"}, 
                                            {$set: {updated: "Updated"}},
                                            {session});

        
                const update_test_1_result = test_1_collection.findOne({name: "Minh Le"});

                if(update_test_1_result){
                    await session.abortTransaction();

                    console.error("Aborted !!!!");

                    return;
                }

                test_1_collection.insertOne({
                    updated: true
                });





            }, transactionOptions);


            if(transactionResults) {
                console.log("The transaction succeeded !!!")
            }
            else {
                console.log("The transaction was intentionally aborted");
            }

        } catch(e){
            console.log("The transaction was aborted due to an unexpected error: " + e);
        } finally {
            await session.endSession();
        }

            
        await test_2_collection.deleteMany({
            justANumber: 0
        });    

        

    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }

}

main().catch(console.error)



async function createOneDocument(client, doc){
    const result = await client.db("test").collection("test-1").insertOne(doc);
    console.log(`New doc created with the following id: ${result.insertedId}`);

}


async function deleteMultipleDocs(client, condition) {
    const result = await client.db("test").collection("test-1").deleteMany(condition);
    console.log(`${result.deletedCount} document(s) was/were deleted.`);   
}