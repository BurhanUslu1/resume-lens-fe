import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/dashboard',
                    '/dashboard/',
                    '/login',
                    '/register',
                    '/verify-email',
                ],
            },
        ],
        sitemap: 'https://resumelens.ai/sitemap.xml',
    };
}
