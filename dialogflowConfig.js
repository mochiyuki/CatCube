const projectId = "catcube-28523";

const uuid = require("uuid");

const sessionId = uuid.v4();
const query = "what's your name?";
const languageCode = "en-US";

const dialogflow = require("dialogflow");
let privateKey =
  "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoI6H8H6e2YA7o\nGzceQ/obr/+e/zNupwKK4wzdLd8lu2SEwkvFnu1k37VQVr4VvARfd8FLwb8+RUfT\ne2kqlFyiI9k7zLqNwm2BQptctY48a7XxrEM/Fki2ModeCXowTroixU6S3ZzlFPwv\njYEqTULlBP8bKlzDMXZl2Br5VOyOwiKd+ifi/fnCJCwLC2U3SbNg1MkzMF2BSx26\n1f1eUfB/cJTcHQ53euY4TDqKKmCKbRUyXMmmwxOEczcrKf0WWzPrQdARMBwHMv19\naY2HwxN3KyEf8IOWPqjeP9ZjDmInJjEXTucdYIN5c7Jg89FF6sUwUWM4VkXHAbWL\nhsjpU+mHAgMBAAECggEAMhcLdtTnXcmYJ0WUUgvmQsFX4cIdTGWsuDuT5YB47gC5\nnWNUt3b1Ogv7NAfjcQ4mL1q51xvNIXv6PeKSHgE854DOgqYnHXxCqzNwnVnpGc7s\n0SaEkhLNbpn3AejI4gNSKHGnStGCoCx0RKZfSH7j4t5uMWWZZP0jTIvo3UaTgqOP\nf4h1dzi4bLsnkfJupxJPkBGQLRNd9eRPT4hEAbyeBkllo+JCOYf+pxSvliGEfSbM\n2ze+EQ3+AlA7Xym4yXmfEsGvqUJ60rArTa9Re3tA6m9f28+jrwzUhZkYud7OoQ6D\nFzcEgVDj5oP9SFGYxOgw8cGKSNM6QBUSoH4Ia7axgQKBgQDXmo/CT1YH5UQFZtX2\nDW8zG9++FAAHOJwMngfH+rbP4eQONk/+KcXhDq/XwPwhh6ScX7zaFYzC2He+Qxos\n8Q6651uuI+siQCYfpUYoUYFOG5dKQcEbvJI21I9upFyhrDdOK2OQqb3M8JxlJv7z\nYTo42xitqLQ19vYW3wtb3elTkQKBgQDHpG6vN+U1gIULWpj5Ippf7haN/4QcDMIW\n/SHenQdU0NnV7sIFm1qY0QjQXaWwXnjURB1tfC389dpAHOpQLrU0aG6tFf5hFdc9\nA3qF2bqAayacqTgQ9e++AOi0R8zcb9oCk+IptX4JJfo8H8ytWIkHxUVZRgc/IUvw\nNdXjIpwvlwKBgDA3IG8Tzul1HAEZPkAIQRXs5dxcHKWAw2UO8i6GottaaOXEv57X\nOKlb33cgcUIOU4Gk51bd+tyYDC9AUlo6jlC97ILFBZBjSCNLkqTxlTkicnLowYay\nZQBeCLV1jEGbgcK5cUqoqwlpxY/ZaKqE08BjPuGXGLX4xI/Y0XF57vQBAoGAGVUo\nJlu1XgCc4T/xwUs+w4V2nzYZEWYdCsW8En9iesS1n4vYWtXHvTRpJed8KtESC/1I\nrqffPgYEV7ZTlTEYFTpbMONlj/Qxh7B1T569J6ZxE9f1IVHTxgxfeuDRgfc/dqxF\nOn2pLIgBJLf0RNrDKJVDo3xbVwtmk2iBZ3zwzKkCgYBXKawWWx00TN/qla0k4/WL\nnRjTRXDnq5VZe2ta+1gUR2RmJGnado7JNF+3zwjvlu7VnEJnB+Vnf7SwZX7FiWpx\nCxjnLfe1ywp1DIXXWiZ4TETJT2h6IrC/CYwa6vGBY8MAikn/lM/I8S4GInI16BBQ\ndGcDlPDKR0lO12TZg93H2w==\n-----END PRIVATE KEY-----\n";

let clientEmail = "catcube-28523@appspot.gserviceaccount.com";

let config = {
  credentials: {
    private_key: privateKey,
    client_email: clientEmail
  }
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode
    }
  }
};

sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`Intent: ${result.intent.displayName}`);
    } else {
      console.log(`No intent matched.`);
    }
  })
  .catch(err => {
    console.error("ERROR:", err);
  });
