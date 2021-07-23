async function main() {
    const uri = "mongodb+srv://blahblahblah"

    const client = new MongoClient(uri)

    try {
        await client.connect()

        await listDatabases(client)
    } catch (e) {
        console.error(e)
    }
    finally {
        await client.close()
    }
    
    
}

async function listDatabases(client) {
    databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(` - ${db.name}`))
}


main().catch(console.error)
