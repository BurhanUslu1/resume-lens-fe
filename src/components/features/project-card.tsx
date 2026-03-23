'use client'

import { Card, CardContent } from "@/components/Ui/base/card";



interface ProjectCardProps {
    title: string;
    subTitle: string;
    details: string[];
    className?: string;
    dotIndicatorColor?: string;
}

export default function ProjectCard({
    title,
    subTitle,
    details,
    className = '',
    dotIndicatorColor = 'bg-pink-400'
}: ProjectCardProps) {
    return (
        <Card className={`bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow ${className}`}>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    {/* Left side with pink accent */}
                    <div className="flex gap-4">
                        <div className={`w-2 h-2 mt-2 rounded-full ${dotIndicatorColor}`} />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                            <p className="text-sm text-gray-500">{subTitle}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 space-y-1">
                    {details.map((task, index) => (
                        <p key={index} className="text-sm text-gray-600">- {task}</p>
                    ))}
                </div>


            </CardContent>
        </Card>
    );
} 