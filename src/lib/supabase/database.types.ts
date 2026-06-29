export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PostStatus = "draft" | "published";

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          excerpt: string;
          summary: string;
          standfirst: string | null;
          takeaways: string[] | null;
          body: string;
          featured: boolean;
          status: PostStatus;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          category: string;
          excerpt: string;
          summary: string;
          standfirst?: string | null;
          takeaways?: string[] | null;
          body: string;
          featured?: boolean;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: string;
          excerpt?: string;
          summary?: string;
          standfirst?: string | null;
          takeaways?: string[] | null;
          body?: string;
          featured?: boolean;
          status?: PostStatus;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
