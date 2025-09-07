
export async function createGroup(groupData: any, token: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    
    try {
        const res = await fetch(`${baseUrl}/api/v1/teacher/groups`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(groupData),
    })
  
    if (!res.ok) {
      throw new Error(`Failed to create group: ${res.status}`)
    }
    
    return res.json() // بيرجع الجروب اللي اتعمل
    } catch (error:any) {
        console.log("create group error => ", error);
        throw error
    }
}