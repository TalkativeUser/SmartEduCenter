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
