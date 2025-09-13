import toast from "react-hot-toast";
import { getCookie } from "../cookiesMethods";
import { AttendanceStatus } from "@/app/dashboard/attendance/page";

export const getTodayGroupsStudents = async () => {
    try {
        const teacherToken = getCookie("teacherToken");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/attendance/get-groups`, {
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            },
           
        });

        if (!res.ok) {
            throw new Error('Failed to fetch today groups students');
        }

        const data = await res.json();
        console.log("get today groups students data => ", data);
        return data.data; 

    } catch (error: any) {
        console.log("get today groups students error => ", error);
        throw error;
    }
}


export async function createAttendance(
    session_time_id: number,
    attendance: { student_id: number; status: AttendanceStatus }[]
  ) {
    const teacherToken = getCookie("teacherToken");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'accept': 'application/json',
          'Authorization': `Bearer ${teacherToken}`
        },
        body: JSON.stringify({
          session_time_id,
          attendance,        
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create attendance`);
      }

     
  
      return await res.json();
    } catch (error) {
      console.error("Error creating attendance:", error);
     
      throw error;
    }
  }

  export async function updateStudentAttendance({ student_id, status,session_time_id}: {student_id: number, status: AttendanceStatus, session_time_id: number}){

    
    const teacherToken = getCookie("teacherToken");
    console.log("update_Student_Attendance ==> ", student_id, status,session_time_id);  
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/attendance/change/${student_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'accept': 'application/json',
          'Authorization': `Bearer ${teacherToken}`
        },
        body: JSON.stringify({
          session_time_id,
          status: status,        
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create attendance`);
      }

      toast.success("✅ تم تغيير الحالة بنجاح!", {
        duration: 3000,
        position: "top-center",
      });
  
      return await res.json();
    } catch (error) {
      console.error("Error creating attendance:", error);
      toast.error("❌ فشل تغيير الحالة!", {
        duration: 3000,
        position: "top-center",
      });
      throw error;
    }
  }

  
