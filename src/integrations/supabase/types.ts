export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendees: {
        Row: {
          created_at: string
          event_id: string | null
          headline: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name: string
          type: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          headline?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendees_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      date_options: {
        Row: {
          active: boolean | null
          date: string
          end_time: string
          id: string
          poll_id: string | null
          start_time: string
        }
        Insert: {
          active?: boolean | null
          date: string
          end_time: string
          id?: string
          poll_id?: string | null
          start_time: string
        }
        Update: {
          active?: boolean | null
          date?: string
          end_time?: string
          id?: string
          poll_id?: string | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "date_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          name: string
          sheet_url: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          name: string
          sheet_url: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          name?: string
          sheet_url?: string
          slug?: string
        }
        Relationships: []
      }
      participant_date_votes: {
        Row: {
          created_at: string
          date_option_id: string
          id: string
          participant_id: string
        }
        Insert: {
          created_at?: string
          date_option_id: string
          id?: string
          participant_id: string
        }
        Update: {
          created_at?: string
          date_option_id?: string
          id?: string
          participant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_date_votes_date_option_id_fkey"
            columns: ["date_option_id"]
            isOneToOne: false
            referencedRelation: "date_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_date_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      participant_venue_votes: {
        Row: {
          created_at: string
          id: string
          participant_id: string
          venue_option_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_id: string
          venue_option_id: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_id?: string
          venue_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_venue_votes_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participant_venue_votes_venue_option_id_fkey"
            columns: ["venue_option_id"]
            isOneToOne: false
            referencedRelation: "venue_options"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          active: boolean | null
          customer_id: string | null
          email: string
          id: string
          name: string
          poll_id: string | null
        }
        Insert: {
          active?: boolean | null
          customer_id?: string | null
          email: string
          id?: string
          name: string
          poll_id?: string | null
        }
        Update: {
          active?: boolean | null
          customer_id?: string | null
          email?: string
          id?: string
          name?: string
          poll_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          created_at: string
          description: string | null
          edited_at: string | null
          final_date_option_id: string | null
          final_venue_option_id: string | null
          id: string
          is_finalized: boolean | null
          slug: string
          status: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          edited_at?: string | null
          final_date_option_id?: string | null
          final_venue_option_id?: string | null
          id?: string
          is_finalized?: boolean | null
          slug: string
          status?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          edited_at?: string | null
          final_date_option_id?: string | null
          final_venue_option_id?: string | null
          id?: string
          is_finalized?: boolean | null
          slug?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_final_date_option_id_fkey"
            columns: ["final_date_option_id"]
            isOneToOne: false
            referencedRelation: "date_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "polls_final_venue_option_id_fkey"
            columns: ["final_venue_option_id"]
            isOneToOne: false
            referencedRelation: "venue_options"
            referencedColumns: ["id"]
          },
        ]
      }
      venue_options: {
        Row: {
          active: boolean | null
          google_maps_link: string | null
          id: string
          name: string
          nearby_landmarks: string | null
          poll_id: string | null
        }
        Insert: {
          active?: boolean | null
          google_maps_link?: string | null
          id?: string
          name: string
          nearby_landmarks?: string | null
          poll_id?: string | null
        }
        Update: {
          active?: boolean | null
          google_maps_link?: string | null
          id?: string
          name?: string
          nearby_landmarks?: string | null
          poll_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venue_options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_participant_votes: {
        Args: {
          p_participant_id: string
          p_date_option_ids: string[]
          p_venue_option_ids: string[]
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
