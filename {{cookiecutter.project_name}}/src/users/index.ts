import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import users from './users-module';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(JSON.stringify(event))
        await users.initializeKnex();

        if (event.resource === '/user/new' && event.httpMethod === 'POST') {
            const {username, email} = JSON.parse(event.body || '{}');
            const newUserID = await users.addUser(username, email);
            return {
                statusCode: 200,
                body: `created user with id ${newUserID}`,
            };
        }
        if (event.resource === '/user/{id}' && event.httpMethod === 'GET') {
            const id = event.pathParameters?.id;
            if (!id) {
                return {
                    statusCode: 400,
                    body: 'id is required',
                };
            }
            const user = await users.getUser(parseInt(id));
            return {
                statusCode: 200,
                body: JSON.stringify(user),
            };
        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `hello user!`,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};