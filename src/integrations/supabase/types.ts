export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      application_notes: {
        Row: {
          admin_id: string | null
          application_id: string
          created_at: string | null
          id: string
          note: string
          tags: string[] | null
        }
        Insert: {
          admin_id?: string | null
          application_id: string
          created_at?: string | null
          id?: string
          note: string
          tags?: string[] | null
        }
        Update: {
          admin_id?: string | null
          application_id?: string
          created_at?: string | null
          id?: string
          note?: string
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "application_notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string | null
          credit_report_authorized: boolean | null
          id: string
          preferred_advance_amount: number | null
          repayment_terms: Database["public"]["Enums"]["repayment_terms"] | null
          reviewed_at: string | null
          signature_data: string | null
          signature_date: string | null
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string | null
          terms_agreed: boolean | null
          updated_at: string | null
          user_id: string
          verification_consent: boolean | null
        }
        Insert: {
          created_at?: string | null
          credit_report_authorized?: boolean | null
          id?: string
          preferred_advance_amount?: number | null
          repayment_terms?:
            | Database["public"]["Enums"]["repayment_terms"]
            | null
          reviewed_at?: string | null
          signature_data?: string | null
          signature_date?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string | null
          terms_agreed?: boolean | null
          updated_at?: string | null
          user_id: string
          verification_consent?: boolean | null
        }
        Update: {
          created_at?: string | null
          credit_report_authorized?: boolean | null
          id?: string
          preferred_advance_amount?: number | null
          repayment_terms?:
            | Database["public"]["Enums"]["repayment_terms"]
            | null
          reviewed_at?: string | null
          signature_data?: string | null
          signature_date?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string | null
          terms_agreed?: boolean | null
          updated_at?: string | null
          user_id?: string
          verification_consent?: boolean | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          application_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          uploaded_at: string | null
        }
        Insert: {
          application_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          application_id?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          application_id: string
          average_monthly_revenue: number | null
          average_nightly_rate: number | null
          average_occupancy_rate: number | null
          bank_account_number_last_4: string | null
          bank_name: string | null
          booking_history_summary: string | null
          booking_platforms: string[] | null
          created_at: string | null
          current_mortgage_balance: number | null
          estimated_property_value: number | null
          future_bookings_nights: number | null
          future_bookings_revenue: number | null
          id: string
          monthly_mortgage_payment: number | null
          number_of_bathrooms: number | null
          number_of_bedrooms: number | null
          outstanding_debts: string | null
          ownership_status: Database["public"]["Enums"]["ownership_status"]
          property_address: string
          property_type: Database["public"]["Enums"]["property_type"]
          property_type_other: string | null
          square_footage: number | null
          updated_at: string | null
          year_of_purchase: number | null
        }
        Insert: {
          application_id: string
          average_monthly_revenue?: number | null
          average_nightly_rate?: number | null
          average_occupancy_rate?: number | null
          bank_account_number_last_4?: string | null
          bank_name?: string | null
          booking_history_summary?: string | null
          booking_platforms?: string[] | null
          created_at?: string | null
          current_mortgage_balance?: number | null
          estimated_property_value?: number | null
          future_bookings_nights?: number | null
          future_bookings_revenue?: number | null
          id?: string
          monthly_mortgage_payment?: number | null
          number_of_bathrooms?: number | null
          number_of_bedrooms?: number | null
          outstanding_debts?: string | null
          ownership_status: Database["public"]["Enums"]["ownership_status"]
          property_address: string
          property_type: Database["public"]["Enums"]["property_type"]
          property_type_other?: string | null
          square_footage?: number | null
          updated_at?: string | null
          year_of_purchase?: number | null
        }
        Update: {
          application_id?: string
          average_monthly_revenue?: number | null
          average_nightly_rate?: number | null
          average_occupancy_rate?: number | null
          bank_account_number_last_4?: string | null
          bank_name?: string | null
          booking_history_summary?: string | null
          booking_platforms?: string[] | null
          created_at?: string | null
          current_mortgage_balance?: number | null
          estimated_property_value?: number | null
          future_bookings_nights?: number | null
          future_bookings_revenue?: number | null
          id?: string
          monthly_mortgage_payment?: number | null
          number_of_bathrooms?: number | null
          number_of_bedrooms?: number | null
          outstanding_debts?: string | null
          ownership_status?: Database["public"]["Enums"]["ownership_status"]
          property_address?: string
          property_type?: Database["public"]["Enums"]["property_type"]
          property_type_other?: string | null
          square_footage?: number | null
          updated_at?: string | null
          year_of_purchase?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      application_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "funded"
      document_type:
        | "government_id"
        | "property_deed"
        | "mortgage_statement"
        | "booking_history"
        | "insurance_proof"
        | "utility_bill"
        | "bank_statements"
      ownership_status: "owned_outright" | "mortgaged"
      property_type:
        | "single_family"
        | "multi_family"
        | "condo_apartment"
        | "other"
      repayment_terms: "weekly" | "bi_weekly" | "monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      application_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "funded",
      ],
      document_type: [
        "government_id",
        "property_deed",
        "mortgage_statement",
        "booking_history",
        "insurance_proof",
        "utility_bill",
        "bank_statements",
      ],
      ownership_status: ["owned_outright", "mortgaged"],
      property_type: [
        "single_family",
        "multi_family",
        "condo_apartment",
        "other",
      ],
      repayment_terms: ["weekly", "bi_weekly", "monthly"],
    },
  },
} as const
