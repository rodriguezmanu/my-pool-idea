export namespace Idea {
  export interface Body {
    content: string;
    impact: number;
    ease: number;
    confidence: number;
  }

  export interface Get {
    Body;
    id: string;
    average_score: number;
    created_at: number;
  }
}
