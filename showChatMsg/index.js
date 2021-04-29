const AWS = require('aws-sdk');

const api = new AWS.ApiGatewayManagementApi(
{
  endpoint: 'hdwvgbrzvg.execute-api.us-east-1.amazonaws.com/dev'
});

exports.handler = async (event) => 
{
    console.log(event);
    const connectionId = event.requestContext.connectionId;
    await replyToMessage("Can We Build!", connectionId);

    return { statusCode: 200 };
    
}

async function replyToMessage(response, connectionId) 
{
    const data = { message: response };
    const params = 
    {
      ConnectionId: connectionId,
      Data: JSON.stringify(data)
    };

    return api.postToConnection(params).promise();
}
