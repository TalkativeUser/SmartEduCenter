import { Student } from "@/types"
import { getCookie } from "../cookiesMethods"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { group } from "console";


export async function createStudent({name,phone,geneder,group_id}:Student) {

  const studentData = {
    name,
    phone,
    group_id,
    geneder,
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const teacherToken = getCookie("teacherToken")

    console.log("student sended to api => ", {name,phone,geneder,group_id})

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

    console.log("created student method res => ", res)
    return (await res.json()) as Student // بيرجع الطالب اللي اتعمل
  } catch (error: any) {
    console.log("create student error => ", error)
    throw error
  }
}

// ---------- GET ALL STUDENTS ----------
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


// ---------- GET STUDENT BY ID ----------
export const getStudentByIdThunk = createAsyncThunk<Student, number>(
  "students/getStudentById",
  async (studentId, { rejectWithValue }) => {
    const teacherToken = getCookie("teacherToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/students/${studentId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch student with id: ${studentId}`);
      }

      const data = await res.json();
      return data.data as Student;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch student");
    }
  }
);

// ---------- UPDATE STUDENT ----------
export const updateStudentThunk = createAsyncThunk<Student, { id: number; updatedData: Partial<Student> }>(
  "students/updateStudent",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const teacherToken = getCookie("teacherToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/students/${id}`, {  
        method: "PUT", // لو الـ API بيستخدم PATCH غيرها هنا
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherToken}`,
        },
        body: JSON.stringify({...updatedData,status:true}),
      });

      if (!res.ok) {
        throw new Error(`Failed to update student with id: ${id}`);
      }

      const data = await res.json();
      return data.data as Student;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update student");
    }
  }
);

// ---------- DELETE STUDENT ----------
export const deleteStudentThunk = createAsyncThunk<number, number>(
  "students/deleteStudent",
  async (studentId, { rejectWithValue }) => {
    const teacherToken = getCookie("teacherToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/students/${studentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${teacherToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete student with id: ${studentId}`);
      }

      // نرجع الـ id عشان نستخدمه في reducer و نمسح الطالب من الـ state
      return studentId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete student");
    }
  }
);


