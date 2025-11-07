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
      advances: {
        Row: {
          amount_repaid: number
          application_id: string
          approved_amount: number
          approved_at: string
          created_at: string
          disbursed_amount: number | null
          disbursed_at: string | null
          expected_completion_date: string | null
          id: string
          repayment_percentage: number
          status: string
          total_repayment_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_repaid?: number
          application_id: string
          approved_amount: number
          approved_at?: string
          created_at?: string
          disbursed_amount?: number | null
          disbursed_at?: string | null
          expected_completion_date?: string | null
          id?: string
          repayment_percentage?: number
          status?: string
          total_repayment_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_repaid?: number
          application_id?: string
          approved_amount?: number
          approved_at?: string
          created_at?: string
          disbursed_amount?: number | null
          disbursed_at?: string | null
          expected_completion_date?: string | null
          id?: string
          repayment_percentage?: number
          status?: string
          total_repayment_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "advances_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      airbnb_bookings: {
        Row: {
          booking_end_date: string
          booking_start_date: string
          booking_status: string | null
          connection_id: string
          created_at: string
          estimated_revenue: number | null
          guest_name: string | null
          id: string
          nights: number | null
          raw_data: Json | null
          updated_at: string
        }
        Insert: {
          booking_end_date: string
          booking_start_date: string
          booking_status?: string | null
          connection_id: string
          created_at?: string
          estimated_revenue?: number | null
          guest_name?: string | null
          id?: string
          nights?: number | null
          raw_data?: Json | null
          updated_at?: string
        }
        Update: {
          booking_end_date?: string
          booking_start_date?: string
          booking_status?: string | null
          connection_id?: string
          created_at?: string
          estimated_revenue?: number | null
          guest_name?: string | null
          id?: string
          nights?: number | null
          raw_data?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "airbnb_bookings_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "airbnb_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      airbnb_connections: {
        Row: {
          created_at: string
          ical_url: string
          id: string
          last_synced_at: string | null
          listing_name: string | null
          property_id: string
          sync_error: string | null
          sync_status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          ical_url: string
          id?: string
          last_synced_at?: string | null
          listing_name?: string | null
          property_id: string
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          ical_url?: string
          id?: string
          last_synced_at?: string | null
          listing_name?: string | null
          property_id?: string
          sync_error?: string | null
          sync_status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "airbnb_connections_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
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
          applicant_type: string | null
          created_at: string | null
          credit_report_authorized: boolean | null
          form_data: Json | null
          id: string
          preferred_advance_amount: number | null
          repayment_terms: Database["public"]["Enums"]["repayment_terms"] | null
          requested_advance_amount: number | null
          reviewed_at: string | null
          selected_booking_ids: string[] | null
          selected_bookings_revenue: number | null
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
          applicant_type?: string | null
          created_at?: string | null
          credit_report_authorized?: boolean | null
          form_data?: Json | null
          id?: string
          preferred_advance_amount?: number | null
          repayment_terms?:
            | Database["public"]["Enums"]["repayment_terms"]
            | null
          requested_advance_amount?: number | null
          reviewed_at?: string | null
          selected_booking_ids?: string[] | null
          selected_bookings_revenue?: number | null
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
          applicant_type?: string | null
          created_at?: string | null
          credit_report_authorized?: boolean | null
          form_data?: Json | null
          id?: string
          preferred_advance_amount?: number | null
          repayment_terms?:
            | Database["public"]["Enums"]["repayment_terms"]
            | null
          requested_advance_amount?: number | null
          reviewed_at?: string | null
          selected_booking_ids?: string[] | null
          selected_bookings_revenue?: number | null
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
      audit_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_data: Json | null
          old_data: Json | null
          row_id: string | null
          table_name: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          row_id?: string | null
          table_name: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          row_id?: string | null
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          admin_notes: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string | null
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
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          related_advance_id: string | null
          related_application_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          related_advance_id?: string | null
          related_application_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          related_advance_id?: string | null
          related_application_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_advance_id_fkey"
            columns: ["related_advance_id"]
            isOneToOne: false
            referencedRelation: "advances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_related_application_id_fkey"
            columns: ["related_application_id"]
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
      repayment_transactions: {
        Row: {
          advance_id: string
          amount: number
          booking_id: string | null
          created_at: string
          id: string
          notes: string | null
          source: string
          stripe_payment_id: string | null
          transaction_date: string
        }
        Insert: {
          advance_id: string
          amount: number
          booking_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          source: string
          stripe_payment_id?: string | null
          transaction_date?: string
        }
        Update: {
          advance_id?: string
          amount?: number
          booking_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          source?: string
          stripe_payment_id?: string | null
          transaction_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "repayment_transactions_advance_id_fkey"
            columns: ["advance_id"]
            isOneToOne: false
            referencedRelation: "advances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "repayment_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "airbnb_bookings"
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
      user_owns_application: {
        Args: { _application_id: string; _user_id: string }
        Returns: boolean
      }
      user_owns_property: {
        Args: { _property_id: string; _user_id: string }
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
