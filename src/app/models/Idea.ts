export namespace Idea {
  export interface Body {
    content: string;
    impact: number;
    ease: number;
    confidence: number;
    average_score?: number;
    isEdit?: boolean;
  }

  export interface Get extends Body {
    id: string;
    average_score: number;
    created_at: number;
  }
}
