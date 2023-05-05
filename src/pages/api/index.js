// Side note: Does this really work? lol. This does.

/* 
This file contains all of the basic CRUD routes for the application to connect to our Atlas Data API.
USED SOURCES: https://github.com/mongodb-developer/social-app-demo/tree/5-lesson
*/
export default async function handler(req, res) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.MONGODB_DATA_API_KEY,
    },
  };

  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE, //CLUSETER NAME
    database: 'twitter', //DATABASE NAME
    collection: 'tweets', //COLLECTION NAME
  };

  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) { // CRUD operations (aka Create, Remove, Update, Delete)
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, { //e fetch to make a request to the find Data API endpoint using the baseUrl, fetchOptions, and fetchBody variables.
          ...fetchOptions, //The three dots in JavaScript are the spread / rest operator. (used when we don't know how many parameters we have)
          body: JSON.stringify({ //make a string out of the request body
            ...fetchBody,
            sort: { postedAt: -1 }, //sort descending on the postedAt field.
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson.documents); //return the json to the client along with a status code of 200
        break;

      case "POST": //TODO: test if post request correct
        const tweet = req.body; //document while be passed using the body property of the request.
        const insertData = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            document: tweet
          }),
        });
        const insertDataJson = await insertData.json();
        res.status(200).json(insertDataJson); //the response doesn't contain the document this time, but an indication of what actions were performed on the database.
        break;

      case "PUT": //TODO: test if put request correct
        const updateData = await fetch(`${baseUrl}/updateOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: req.body._id } }, //we let know which document we want to update by ID, 
            //req.body._id gives us this id and _id needs to be equal to the object id
            update: { $set: { body: req.body.body, } } //set our body to our new request .body
          }),
        });
        const updateDataJson = await updateData.json();
        res.status(200).json(updateDataJson); //the response doesn't contain the document this time, but an indication of what actions were performed on the database.
        break;

      case "DELETE": //TODO: test if delete request correct
        const deleteData = await fetch(`${baseUrl}/deleteOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            filter: { _id: { $oid: req.body._id } }, //we let know which document we want to update by ID, 
          }),
        });
        const deleteDataJson = await deleteData.json();
        res.status(200).json(deleteDataJson); //the response doesn't contain the document this time, but an indication of what actions were performed on the database.
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}