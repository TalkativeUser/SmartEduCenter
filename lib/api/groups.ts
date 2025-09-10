import { Group } from "@/types"
import { getCookie } from "../cookiesMethods"

export async function createGroup(
  {
    name,
    class_id,
    number_of_sessions,
    price_of_group,
    times,
    // maximum_students,
    // payment_period,
    // start_date,
    // group_description,
  }: Group,
  token: string
): Promise<Group> {

  // this warining because comminted propertis
  const groupData: Group = {
    name,
    class_id,
    number_of_sessions,
    price_of_group,
    times,
    
    // maximum_students,
    // payment_period,
    // start_date,
    // group_description,
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const teacherToken = getCookie("teacherToken")

  console.log("create group groupData => ", groupData)
  console.log("create group token => ", token)

  try {
    const res = await fetch(`${baseUrl}/api/v1/teacher/groups`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
      body: JSON.stringify({...groupData,status:true}),
    })

    if (!res.ok) {
      throw new Error(`Failed to create group: ${res.status}`)
    }

    console.log("create group method res => ", res)
    return (await res.json()) as Group // بيرجع الجروب اللي اتعمل
  } catch (error: any) {
    console.log("create group error => ", error)
    throw error
  }
}


export async function updateGroup({
  id,
  name,
  class_id,
  number_of_sessions,
  price_of_group,
  times,
}: Group): Promise<Group> {
  
  // 🔹 هنا بنظبط الوقت HH:mm فقط
  const fixedTimes = times.map((t) => ({
    ...t,
    session_time: t.session_time.slice(0, 5), // ياخد أول 5 حروف بس -> HH:mm
  }));

  const updateGroup: Group = {
    name,
    class_id,
    number_of_sessions,
    price_of_group,
    times: fixedTimes,
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const teacherToken = getCookie("teacherToken");

  try {
    console.log(
      "update group that sended to backEnd => ",
      JSON.stringify({ ...updateGroup, status: true })
    );

    const res = await fetch(`${baseUrl}/api/v1/teacher/groups/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
      body: JSON.stringify({ ...updateGroup, status: true }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update group: ${res.status}`);
    }

    console.log("update group method res => ", res);
    return (await res.json()) as Group;
  } catch (error: any) {
    console.log("Update group error => ", error);
    throw error;
  }
}

export async function deleteGroup(id: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const teacherToken = getCookie("teacherToken")

  try {
    const res = await fetch(`${baseUrl}/api/v1/teacher/groups/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to delete group: ${res.status}`)
    }

    console.log("delete group method res => ", res)
    return (await res.json()) as Group // بيرجع الجروب اللي اتعدل
  } catch (error: any) {
    console.log("delete group error => ", error)
    throw error
  }
}


export async function getAllGroups ()  {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const teacherToken = getCookie("teacherToken")

  try {
    const res = await fetch(`${baseUrl}/api/v1/teacher/groups`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${teacherToken}`,
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get groups: ${res.status}`)
    }

    console.log("get all groups method res => ", res)
    return (await res.json()) as Group[] 
  } catch (error: any) {
    console.log("get all groups error => ", error)
    throw error
  }
}