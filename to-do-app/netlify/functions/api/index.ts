import server from '../../../../json-server-test/server';
import serverless from 'serverless-http';

export const handler = serverless(server);
