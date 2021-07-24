const MongoClient = require('mongodb').MongoClient

async function main() {
    const uri = "mongodb+srv://ledminh_mongo_1:ux8OjvgAZxgf7UEZ@cluster0.mtpim.mongodb.net/test"

    const client = new MongoClient(uri)

    try {
        await client.connect();

        // Delete all docs
        await deleteMultipleDocs(client, {time_created: {$lt: new Date()}});

        let docs = [];
        let titles = [];
        
        for(let i = 0; i < 6; i++) {
            titles.push(getCapitalWord(getRandomInt(4,10)));
        }

        for(let i = 0; i < 5000; i++){
            docs.push({
                title: titles[getRandomInt(0,titles.length)],
                name: getCapitalWord(getRandomInt(4,10)),
                age: getRandomInt(30,75),
                description: getASentence(5,14),
                time_created: new Date()
            });
        }

        await createMultipleDocument(client, docs);
        
        


        // Delete all docs
        //await deleteMultipleDocs(client, {time_created: {$lt: new Date()}});
    }
    catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
}


function getRandomInt(from, to) { 
    return from + Math.floor(Math.random() * (to - from));    
}

function getRandomLowerCaseLetter() {
    return String.fromCharCode(97 + getRandomInt(0,26))
}

function getRandomUpperCaseLetter() {
    return String.fromCharCode(65 + getRandomInt(0,26))
}


function getAWord(length) {
    let w = "";

    for (let i = 0; i < length; i++) {
        w += getRandomLowerCaseLetter();
    }

    return w;
}

function getCapitalWord(length) {
    let w = getRandomUpperCaseLetter();

    for (let i = 0; i < length - 1; i++) {
        w += getRandomLowerCaseLetter();
    }

    return w;
}

function getASentence(length) {
    let sen = getCapitalWord(getRandomInt(1, 6));

    for(let i = 0; i < length; i++){
        sen += " " + getAWord(getRandomInt(1,6));
    }

    sen += ".";

    return sen;
}

function getAParagraph(length) {
    let par = getASentence(getRandomInt(5, 13)); 

    for(let i = 0; i < length - 1; i++){
        par += " " + getASentence(getRandomInt(5, 13));
    }

    return par;
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
    console.log(`${result.insertedCount} new doc(s) were created`);

}

/******************************
 * DELETE DOCUMENTS
 */
async function deleteMultipleDocs(client, condition) {
    const result = await client.db("test").collection("test-1").deleteMany(condition);

    console.log(`${result.deletedCount} document(s) was/were deleted.`);

   
}


main().catch(console.error)
