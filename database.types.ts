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
      channel_message: {
        Row: {
          channel_id: number | null
          created_at: string
          created_by: string | null
          file_id: number | null
          id: number
        }
        Insert: {
          channel_id?: number | null
          created_at?: string
          created_by?: string | null
          file_id?: number | null
          id?: number
        }
        Update: {
          channel_id?: number | null
          created_at?: string
          created_by?: string | null
          file_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "channel_message_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_message_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_message_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_user: {
        Row: {
          channel_id: number | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          channel_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          channel_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_user_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          created_at: string
          created_by: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      department_user: {
        Row: {
          created_at: string
          department_id: number | null
          id: number
          owner_type: Database["public"]["Enums"]["DepartmentOwnerType"]
          user_id: string | null
        }
        Insert: {
          created_at?: string
          department_id?: number | null
          id?: number
          owner_type?: Database["public"]["Enums"]["DepartmentOwnerType"]
          user_id?: string | null
        }
        Update: {
          created_at?: string
          department_id?: number | null
          id?: number
          owner_type?: Database["public"]["Enums"]["DepartmentOwnerType"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "department_user_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          path: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          path: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          path?: string
        }
        Relationships: [
          {
            foreignKeyName: "files_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: number
          read: boolean | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          read?: boolean | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          read?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avt: string | null
          bio: string | null
          id: string
          name: string
        }
        Insert: {
          avt?: string | null
          bio?: string | null
          id: string
          name: string
        }
        Update: {
          avt?: string | null
          bio?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      task_comment: {
        Row: {
          comment: string
          created_at: string
          created_by: string | null
          id: number
          task_id: number | null
        }
        Insert: {
          comment: string
          created_at?: string
          created_by?: string | null
          id?: number
          task_id?: number | null
        }
        Update: {
          comment?: string
          created_at?: string
          created_by?: string | null
          id?: number
          task_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "task_comment_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_comment_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_department: {
        Row: {
          created_at: string
          department_id: number
          id: number
          task_id: number
        }
        Insert: {
          created_at?: string
          department_id: number
          id?: number
          task_id: number
        }
        Update: {
          created_at?: string
          department_id?: number
          id?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_department_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_department_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_history: {
        Row: {
          created_at: string
          created_by: string
          description: string
          id: number
          task_id: number
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          id?: number
          task_id: number
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          id?: number
          task_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "task_history_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_user: {
        Row: {
          created_at: string
          id: number
          task_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          task_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          task_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_user_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          id: number
          priority: Database["public"]["Enums"]["TaskPriority"]
          status: Database["public"]["Enums"]["TaskStatus"]
          title: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["TaskPriority"]
          status?: Database["public"]["Enums"]["TaskStatus"]
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["TaskPriority"]
          status?: Database["public"]["Enums"]["TaskStatus"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_message: {
        Row: {
          content: string
          created_at: string
          file_id: number | null
          from_id: string
          id: number
          to_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string
          file_id?: number | null
          from_id: string
          id?: number
          to_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          file_id?: number | null
          from_id?: string
          id?: number
          to_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_message_file_id_fkey"
            columns: ["file_id"]
            isOneToOne: false
            referencedRelation: "files"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_message_from_id_fkey"
            columns: ["from_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_message_to_id_fkey"
            columns: ["to_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      DepartmentOwnerType: "owner" | "user"
      TaskPriority: "High" | "Medium" | "Low" | "high" | "medium" | "low"
      TaskStatus:
        | "To_do"
        | "In_Progress"
        | "In_Preview"
        | "In_Complete"
        | "QA"
        | "Done"
        | "Archived"
        | "to_do"
        | "in_progress"
        | "in_preview"
        | "in_complete"
        | "qa"
        | "done"
        | "archived"
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
