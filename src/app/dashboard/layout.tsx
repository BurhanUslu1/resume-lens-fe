'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/Ui/base/breadcrumb"
import { useUser } from "@/hooks/useUser"
import { Home } from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const { user, isLoading } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    }, [user, isLoading, router])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    const getBreadcrumbItems = () => {
        const paths = pathname.split('/').filter(Boolean)
        const items = []

        // Skip the first 'dashboard' path since we're adding it manually
        const relevantPaths = paths.slice(1)

        for (let i = 0; i < relevantPaths.length; i++) {
            const path = relevantPaths[i]
            const href = `/dashboard/${relevantPaths.slice(0, i + 1).join('/')}`
            const label = path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

            if (i === relevantPaths.length - 1) {
                items.push(
                    <BreadcrumbItem key={href}>
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                    </BreadcrumbItem>
                )
            } else {
                items.push(
                    <BreadcrumbItem key={href}>
                        <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    </BreadcrumbItem>
                )
            }
        }

        return items
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-8 pl-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard" className="flex items-center pl-1">
                                    <Home className="h-4 w-4" />
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {getBreadcrumbItems().map((item, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbSeparator />
                                    {item}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <main className="mt-0 py-8">
                    {children}
                </main>
            </div>
        </div>
    )
} 