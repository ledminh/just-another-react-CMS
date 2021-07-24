// Create a unique index on the email field in the users collection.
        // Note that if you run this script when you already have duplicate emails in the user collection, 
        // MongoDB will be unable to create the unique index.
        const createIndexResults = await client.db("sample_airbnb").collection("users").createIndex({ "email": 1 }, { unique: true });
        console.log(`Index successfully created: ${createIndexResults}`);