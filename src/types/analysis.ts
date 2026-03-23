export interface ImprovementTip {
    priority: 'high' | 'medium' | 'low';
    section: string;
    issue: string;
    suggestion: string;
}

export interface AnalysisHistory {
    id: string;
    score: number;
    lastUpdated: string;
    matchDetails: {
        jobTitle: string;
        strengths?: string[];
        weaknesses?: string[];
        // Improvement Tips fields
        summaryGap?: string;
        improvementTips?: ImprovementTip[];
        keywordsToAdd?: string[];
    };
}

export interface AnalysisHistoryResponse {
    history: AnalysisHistory[];
    totalCount: number;
}

export interface AnalysisResponse {
    score: number;
    matchDetails: {
        jobTitle: string;
        strengths?: string[];
        weaknesses?: string[];
    };
}