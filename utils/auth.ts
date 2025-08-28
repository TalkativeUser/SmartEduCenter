import type { User } from "../store/slices/authSlice"

// Mock authentication functions - replace with real API calls
export const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock user data
  if (email === "teacher@school.com" && password === "password") {
    return {
      id: "1",
      name: "John Smith",
      email: "teacher@school.com",
      role: "teacher",
      avatar: "/teacher-avatar.png",
    }
  }

  if (email === "student@school.com" && password === "password") {
    return {
      id: "2",
      name: "Jane Doe",
      email: "student@school.com",
      role: "student",
      avatar: "/student-avatar.png",
    }
  }

  throw new Error("Invalid credentials")
}

export const mockRegister = async (
  name: string,
  email: string,
  password: string,
  role: "teacher" | "student",
): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    role,
    avatar: `/placeholder.svg?height=40&width=40&query=${role}+avatar`,
  }
}
