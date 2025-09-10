import { Student } from "@/types"
import { getCookie } from "../cookiesMethods"
import { createAsyncThunk } from "@reduxjs/toolkit";


export async function createStudent({name,phone,geneder,group}:Student) {

  const studentData = {
    name,
    phone,
    group_id:group?.id,
    geneder,
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const teacherToken = getCookie("teacherToken")

  console.log("create group groupData => ", studentData)

  try {
    const res = await fetch(`${baseUrl}/api/v1/teacher/students`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
      body: JSON.stringify({...studentData,status:true}),
    })

    if (!res.ok) {
      throw new Error(`Failed to create group: ${res.status}`)
    }

    console.log("create group method res => ", res)
    return (await res.json()) as Student // بيرجع الطالب اللي اتعمل
  } catch (error: any) {
    console.log("create group error => ", error)
    throw error
  }
}


export const getAllStudentsThunk = createAsyncThunk<Student[]>(
  "students/getAllStudents",
  async (_, { rejectWithValue }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const teacherToken = getCookie("teacherToken");
    if (!teacherToken) {
      return rejectWithValue("Teacher token is missing");
    }
    try {
      const res = await fetch(`${baseUrl}/api/v1/teacher/students`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch students: ${res.status}`);
      }
console.log('get all students',res)
      const data = await res.json();
      return data.data as Student[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch students");
    }
  }
);


