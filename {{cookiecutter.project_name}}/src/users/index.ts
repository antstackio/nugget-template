import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import users from './users-module';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(JSON.stringify(event))
        await users.initializeKnex();
        const user = await users.getUser(1);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `hello ${user ? user.username : 'user'}!`,
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