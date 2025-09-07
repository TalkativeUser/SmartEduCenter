import { ClassItem } from "@/types";
import { getCookie } from "../cookiesMethods";



export const createClassRoom = async ({start_year, end_year, name, status, subject_id, year}: ClassItem) => {
    try {
        const teacherToken = getCookie("teacherToken");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            },
            body: JSON.stringify({
                start_year,
                end_year,
                name,
                status,
                subject_id,
                year
            })
        });

        if (!res.ok) {
            throw new Error('Failed to create classroom');
        }

        const data = await res.json();
        return data.data; 

    } catch (error: any) {
        console.log("create class room error => ", error);
        throw error;
    }
}

export const getAllClasses = async () => {
    try {
        const teacherToken = getCookie("teacherToken");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/classes`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch classes');
        }

        const data = await res.json();
        return data.data;

    } catch (error: any) {
        console.log("Get all classes error => ", error);
        throw error;
    }
}

export const deleteClass = async (classId: number) => {
    try {
        const teacherToken = getCookie("teacherToken");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/classes/${classId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to delete class');
        }

        const data = await res.json();
        return data;

    } catch (error: any) {
        console.log("Delete class error => ", error);
        throw error;
    }
}

export const updateClass = async (classId: number, updateData: {
    start_year: number;
    end_year: number;
    name: string;
    status: boolean;
    subject_id: number;
    year: number;
}) => {
    try {
        const teacherToken = getCookie("teacherToken");
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/classes/${classId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            },
            body: JSON.stringify(updateData)
        });

        if (!res.ok) {
            throw new Error('Failed to update class');
        }

        const data = await res.json();
        return data.data;

    } catch (error: any) {
        console.log("Update class error => ", error);
        throw error;
    }
}

export const getClassMetadata = async () => {
    try {
        const teacherToken = getCookie("teacherToken");
        console.log("teacherToken => ", teacherToken);
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/class-metadata`, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json", 
                'accept': 'application/json',
                'Authorization': `Bearer ${teacherToken}`
            }
        });

        if (!res.ok) {
            throw new Error('Failed to fetch class metadata');
        }

        const data = await res.json();
        console.log('Class metadata response:', data.data.subjects);
        return data.data.subjects;

    } catch (error: any) {
        console.log("Get class metadata error => ", error);
        throw error;
    } finally {
    }
}