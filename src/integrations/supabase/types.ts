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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
