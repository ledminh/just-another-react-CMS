const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect()
        //List databases
        console.log("*******************************")
        console.log("*    LIST ALL DATABASE        *")
        console.log("*******************************")
        await listDatabases(client)
        
        console.log();
     

        console.log("*******************************")
        console.log("*   LIST OF DOCS INITIALLY    *")
        console.log("*******************************")
        await findAllDocs(client)
        
        console.log();
        console.log();

        //Create documents
        console.log("*******************************")
        console.log("*   CREATE ONE DOCUMENT       *")
        console.log("*******************************")
        
        await createOneDocument(client, {
            name: "User 1",
            age: 41,
            description: "This is user 1",
            time_created: new Date()
        })
        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();
    
        console.log("*******************************")
        console.log("* CREATE MULTIPLE DOCUMENTS   *")
        console.log("*******************************")
        await createMultipleDocument(client, [
            {
                name: "User 2",
                age: 42,
                description: "This is user 2",
                time_created: new Date()
            },

            {
                name: "User 3",
                age: 43,
                description: "This is user 3",
                time_created: new Date()
            },

            {
                name: "User 4",
                age: 44,
                description: "This is user 4",
                time_created: new Date()
            },

            {
                name: "User 5",
                age: 45,
                description: "This is user 5",
                time_created: new Date()
            },

            {
                name: "User 6",
                age: 46,
                description: "This is user 6",
                time_created: new Date()
            },

        ])

        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();
    

        
        
        
        //Read documents
        console.log("*******************************")
        console.log("*      FIND USER 3            *")
        console.log("*******************************")
        await findOneDoc(client, {name: "User 3"})

        console.log();
        console.log();
    
        console.log("*******************************")
        console.log("*      FIND USER AGE = 41     *")
        console.log("*******************************")
        await findOneDoc(client, {age: 41})     
        
        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*   FIND USER 45 (not found)  *")
        console.log("*******************************")

        await findOneDoc(client, {name: "User 45"})   // Not found
        
        console.log();
        console.log();

        console.log("*******************************")
        console.log("* FIND USERS YOUNGER THAN 42   *")
        console.log("*******************************")
    
        
        await findMultipleDocs(client, {
            maxAge: 42,
            maxNumResult: 100
        })

        
        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("* FIND USERS YOUNGER THAN 41  *")
        console.log("*******************************")
    
        await findMultipleDocs(client, {
            maxAge: 41,
            maxNumResult: 100
        })

        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("* FIND 2 USERS YOUNGER THAN 45*")
        console.log("*******************************")
        await findMultipleDocs(client, {
            maxAge: 45,
            maxNumResult: 2
        })

        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("* FIND 1 USERS YOUNGER THAN 50*")
        console.log("*******************************")
        await findMultipleDocs(client, {
            maxAge: 50,
            maxNumResult: 1
        })


        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*FIND ALL USERS YOUNGER THAN 50*")
        console.log("*******************************")

        await findMultipleDocs(client, {
            maxAge: 50
        })

        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*FIND ALL USERS YOUNGER THAN 15*")
        console.log("*******************************")
        await findMultipleDocs(client, {
            maxAge: 15
        })

        console.log();
        console.log();

        //Update one document
        console.log("*******************************")
        console.log("*   UPDATE DESC OF USER 2     *")
        console.log("*******************************")
        await updateOneDoc(client, {name: "User 2"}, {description: "This is user 2 updated"});
        console.log(".............")
        console.log();

        await findAllDocs(client)


        //Upsert one document
        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*   UPSERT DESC OF USER 3     *")
        console.log("*******************************")
        await upsertOneDoc(client, {name: "User 3"}, {description: "This is user 3 updated"});
        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*   UPSERT DESC OF USER 11     *")
        console.log("*******************************")
        await upsertOneDoc(client, {name: "User 11", age: 47}, {description: "This is user 11"});
        await findMultipleDocs(client, {
            maxAge: 50
        })

        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();
        
        console.log("*******************************")
        console.log("*   UPSERT TIME OF USER 11    *")
        console.log("*******************************")
        await upsertOneDoc(client, {name: "User 11"}, {time_created: new Date()});
        
        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();


        //Update multiple documents
        console.log("*******************************")
        console.log("*   ADD PARTNER TO ALL DOCS   *")
        console.log("*******************************")
        await updateMultipleDocs(client);
       
        console.log(".............")
        console.log();

        await findAllDocs(client)


        //Delete one doc
        console.log("*******************************************")
        console.log("*   DELETE ONE DOC WITH PARTNER UNKNOWN   *")
        console.log("*******************************************")
        await deleteOneDoc(client, {partner: "Unknown"});
        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();


        console.log("*******************************************")
        console.log("*   DELETE ALL DOCS WITH AGE < 44         *")
        console.log("*******************************************")
        await deleteMultipleDocs(client, {age: {$lt: 44}});
        console.log(".............")
        console.log();

        await findAllDocs(client)

        console.log();
        console.log();


        console.log("*******************************")
        console.log("*   DELETE ALL DOCS           *")
        console.log("*******************************")
        await deleteMultipleDocs(client, {time_created: {$lt: new Date()}});
        console.log(".............")
        console.log();

        await findAllDocs(client)

    } catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}

/******************************
 * LIST DATABASES
 */
async function listDatabases(client) {
    databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`))

}



/******************************
 * CREATE DOCUMENTS
 */
async function createOneDocument(client, doc){
    const result = await client.db("test").collection("test-1").insertOne(doc);
    console.log(`New doc created with the following id: ${result.insertedId}`);

}


async function createMultipleDocument(client, docs){
    const result = await client.db("test").collection("test-1").insertMany(docs);
    console.log(`${result.insertedCount} new doc(s) created with the following id(s): `);
    console.log(result.insertedIds);

}




/******************************
 * READ DOCUMENTS
 */
async function findOneDoc(client, conditions) {
    const result = await client.db("test").collection("test-1").findOne(conditions);

    if(result) {
        console.log("Found a doc with the conditions: ");
        console.log(conditions);
        console.log("----------------")
        console.log(result);
    }
    else {
        console.log("No doc with the conditions: ");
        console.log(conditions);
    }

 
}

async function findMultipleDocs(client, {
    maxAge = 0,
    maxNumResult = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db("test").collection("test-1").find({
        age: {$lte: maxAge}
    }).sort({name: -1})
    .limit(maxNumResult)

    const results = await cursor.toArray();

    if(results.length > 0) {
        console.log(`Found entry with at most age ${maxAge}`)

        results.forEach ((result, i) => {
            console.log();
            console.log(`Name: ${result.name}`)
            console.log(`Age: ${result.age}`)
            console.log(`Description: ${result.description}`)
        })
        
    }
    else {
        console.log(`No docs found with at most ${maxAge} year old`)
    }
    
}

async function findAllDocs(client) {
    const cursor = client.db("test").collection("test-1").find();

    const results = await cursor.toArray();

    if(results.length > 0) {
        console.log("LIST OF ALL DOCS: ");

        results.forEach((result, i) => {
            console.log(`${i+1}.`, result);
        })
    }
    else {
        console.log("No doc found !!!!");
    }
}


/******************************
 * UPDATE DOCUMENTS
 */
async function updateOneDoc(client, condition, updatedDoc) {
    const result = await client.db("test").collection("test-1").updateOne(condition, {$set: updatedDoc}); // see https://docs.mongodb.com/manual/reference/operator/update/ for other operators
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
    
}

async function updateMultipleDocs(client) {
    const result = await client.db("test").collection("test-1")
                                .updateMany({partner: {$exists: false}},
                                            {$set: {partner: "Unknown"}});
    
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


/******************************
 * UPSERT DOCUMENTS
 */
async function upsertOneDoc(client, condition, updatedDoc) {
    const result = await client.db("test").collection("test-1").updateOne(condition, {$set: updatedDoc}, {upsert: true}); 
    
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);

    if (result.upsertedCount > 0) {

        console.log(`One document was inserted with the id ${result.upsertedId}`);

    } else {

        console.log(`${result.modifiedCount} document(s) was/were updated.`);

    }

    
}

/******************************
 * DELETE DOCUMENTS
 */
async function deleteOneDoc(client, condition) {
    const result = await client.db("test").collection("test-1").deleteOne(condition);
    
    console.log(`${result.deletedCount} document(s) was/were deleted`);

    
   

}

async function deleteMultipleDocs(client, condition) {
    const result = await client.db("test").collection("test-1").deleteMany(condition);

    console.log(`${result.deletedCount} document(s) was/were deleted.`);

   
}

main().catch(console.error)