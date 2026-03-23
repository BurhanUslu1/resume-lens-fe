'use server'

import { UserInfo } from "@/types/auth";
import { cookies } from "next/headers";

export async function setAuthCookies(accessToken: string, userInfo: UserInfo, idToken: string) {
    const cookieStore = await cookies();

    // Set access token cookie
    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Set user info cookie
    cookieStore.set('userInfo', JSON.stringify(userInfo), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    cookieStore.set('userToken', idToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return { success: true };
}

export async function getAuthUser() {
    const cookieStore = await cookies();
    const userInfoStr = cookieStore.get('userInfo')?.value;
    const accessToken = cookieStore.get('accessToken')?.value;
    const userToken = cookieStore.get('userToken')?.value;
    if (!userInfoStr || !accessToken || !userToken) {
        return { user: null, accessToken: null, userToken: null };
    }

    try {
        const userInfo = JSON.parse(userInfoStr) as UserInfo;
        return { user: userInfo, accessToken, userToken };
    } catch (error) {
        console.error('Error parsing user info:', error);
        return { user: null, accessToken: null, userToken: null };
    }
}

export async function removeAuthCookies() {
    const cookieStore = await cookies();

    cookieStore.delete('accessToken');
    cookieStore.delete('userInfo');

    return { success: true };
} 