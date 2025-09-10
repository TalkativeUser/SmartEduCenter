// Group Interface
export interface Group {
  id?: number;
  name: string;
  class_id?: number;
  number_of_sessions: number;
  price_of_group: number;
  times: {
    session_time: string;
    day_name: string;
  }[];
  maximum_students: number;
  payment_period: "Daily" | "Monthly";
  start_date: string;
  group_description: string;
}

// Class Interface
export interface ClassItem {
  id?: number;
  channel_id?: string;
  code?: string;
  name: string;
  start_year: string;
  end_year: string;
  year?: string;
  groups?: Group[];
  status?: string;
  subject_id?: string;
  created_at?: string;
  updated_at?: string;
}

// Student Interface
export interface Student {
  id?: number;
  name: string;
  geneder: "male" | "female";  
  phone: string;
  group?: Group;             
  code?: string;
  email?: string;
  classRoomId?: number;       
  classRoomName?: string;     
}


  export type Teacher = {
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female" | "";
    password: string;
    confirmPassword?: string;
    image: string;
  };

