'use client';

import { getAuthUser, removeAuthCookies } from "@/actions/auth";
import { UserInfo } from "@/types/auth";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function useUser() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    const fetchUserInfo = useCallback(async () => {
        try {
            const { user, accessToken, userToken } = await getAuthUser();
            setUserInfo(user);
            setAccessToken(accessToken);
            setUserToken(userToken);
        } catch (error) {
            console.error('Error fetching user info:', error);
            setUserInfo(null);
            setAccessToken(null);
            setUserToken(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await removeAuthCookies();
            setUserInfo(null);
            setAccessToken(null);
            setUserToken(null);
            router.replace('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [router]);

    // Fetch user info on mount and when pathname changes
    useEffect(() => {
        fetchUserInfo();
    }, [fetchUserInfo, pathname]);

    return {
        user: userInfo,
        accessToken,
        isLoading,
        refetch: fetchUserInfo,
        logout,
        userToken
    };
} 