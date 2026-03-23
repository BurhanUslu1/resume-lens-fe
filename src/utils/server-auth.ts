import { NextRequest } from 'next/server';

const TOKEN_COOKIE_NAME = 'accessToken';

export const getServerAuthToken = (request: NextRequest) => {
    const accessToken = request.cookies.get(TOKEN_COOKIE_NAME)?.value;
    return accessToken;
}; 