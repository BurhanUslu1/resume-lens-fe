interface StepProgressProps {
    step: number; // 1, 2, or 3
}

export default function StepProgress({ step }: StepProgressProps) {
    return (
        <div className="flex items-center justify-center w-full mb-6">
            {/* Step 1 */}
            <div className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${step >= 1 ? "bg-indigo-600" : "bg-gray-300"}`}>
                    1
                </div>
                <p className={`ml-2 ${step >= 1 ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                    Upload CV
                </p>
            </div>

            {/* Line */}
            <div className={`w-12 h-1 mx-2 ${step >= 2 ? "bg-indigo-600" : "bg-gray-300"}`} />

            {/* Step 2 */}
            <div className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${step >= 2 ? "bg-indigo-600" : "bg-gray-300"}`}>
                    2
                </div>
                <p className={`ml-2 ${step >= 2 ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                    Job Description
                </p>
            </div>

            {/* Line */}
            <div className={`w-12 h-1 mx-2 ${step >= 3 ? "bg-indigo-600" : "bg-gray-300"}`} />

            {/* Step 3 */}
            <div className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${step >= 3 ? "bg-indigo-600" : "bg-gray-300"}`}>
                    3
                </div>
                <p className={`ml-2 ${step >= 3 ? "text-indigo-600 font-semibold" : "text-gray-400"}`}>
                    Match Result
                </p>
            </div>
        </div>
    );
} 