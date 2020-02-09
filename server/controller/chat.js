const dialogflow = require("dialogflow");
const uuid = require("uuid");
const project_details = require("../test-4bc653573e91.json");
// A unique identifier for the given session
const sessionId = uuid.v4();
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(text, projectId = project_details.project_id) {
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./test-4bc653573e91.json"
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text,
        // The language used by the client (en-US)
        languageCode: "en-US"
      }
    }
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  return result.fulfillmentText;
}

exports.sendmessage = async (req, res, next) => {
  const { text } = req.body;
  const response = await runSample(text);
  res.status(200).json({
    status: "success",
    text: response
  });
};
