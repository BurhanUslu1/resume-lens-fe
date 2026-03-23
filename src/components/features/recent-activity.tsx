import ProjectCard from "@/components/features/project-card";

interface RecentActivityProps {
    activities: {
        title: string;
        score: number;
        date: string;
    }[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                    <ProjectCard
                        key={index}
                        title={activity.title}
                        subTitle={`Score: ${activity.score}%`}
                        details={[`Analyzed on ${activity.date}`]}
                        className="hover:shadow-lg transition-shadow duration-200"
                    />
                ))}
            </div>
        </div>
    );
} 