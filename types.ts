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
  


  export interface Student {
    id: number;
      name: string;
      status: "active" | "inactive";
      grade: number;
      parentName: string;
  }
  
  export interface Group {
    id: number;
    name: string;
    day: string[];
    time: string[];
    maximumStudents: number;
    groupPrice: number;
    paymentPeriod: "Daily" | "Monthly";
    startDate: string;
    groupDescription: string;
    numberOfSessions: number;
    students: Student[];
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