export interface BaseResponse<T> {
    success: boolean;
    statusCode: number;
    message: 'Success' | 'Error';
    data?: T;
    errors?: string | string[];
    timestamp: string;
}

export interface ErrorResponse extends Omit<BaseResponse<never>, 'data' | 'errors'> {
    message: 'Error';
    errors: string | string[];
}

export interface MatchResponseInterface {
    matchScore: number;
    matchDetails: {
        strengths: string[];
        weaknesses: string[];
    }
}

export interface UploadResponseData {
    fileName: string;
}

// ── Improvement Tips ────────────────────────────────────────────────────────

export interface ImprovementTip {
    priority: 'high' | 'medium' | 'low';
    section: string;
    issue: string;
    suggestion: string;
}

export interface ImprovementTipsResponseData {
    matchScore: number;
    summaryGap: string;
    improvementTips: ImprovementTip[];
    keywordsToAdd: string[];
    strengthsToHighlight: string[];
}

// ── Compare Jobs ────────────────────────────────────────────────────────────

export interface RankedJob {
    rank: number;
    jobIndex: number;
    score: number;
    title: string;
    fit: 'strong' | 'moderate' | 'weak';
    topStrengths: string[];
    topGaps: string[];
    oneLineSummary: string;
}

export interface CompareJobsResponseData {
    rankedJobs: RankedJob[];
    recommendation: string;
}

