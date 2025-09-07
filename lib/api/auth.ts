import {AppDispatch } from '../../store/store'
import {loginStart , loginFailure , loginSuccess , clearError , logout, registerStart, registerSuccess, registerFailure} from '../../store/slices/authSlice'
import { Teacher } from "@/types";
import { setCookie } from '../cookiesMethods';







export const loginTeacher=({email,password}:{email:string,password:string})=>  async (dispatch:AppDispatch)=>{

      try{
         dispatch(loginStart())

         const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/teacher/login` , {

           method:'POST',
           headers:{'Content-Type':"application/json", 'accept':'application/json'},
           body:JSON.stringify({email,password})
         }  )

         if (!res.ok) {
           
           throw new Error('invalid credentials' )
         }

         const data= await res.json()
         console.log('login prossecc ' , data);
         setCookie('teacherToken',data.data.token , 60*60*24*30)
         setCookie('teacherData', JSON.stringify(data.data.teacher), 60*60*24*30)
         dispatch(loginSuccess( data.data.teacher ))


      } catch(error:any) {
        
        dispatch(loginFailure(error.message))
      }

}





export const registerTeacher=({name,email,phone,gender,password,image}:Teacher)=> async (dispatch:AppDispatch)=>{

  try{
    dispatch(registerStart())

    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/teachers` , {

      method:'POST',
      headers:{'Content-Type':"application/json" , 'accept':'application/json'},
      body:JSON.stringify({name,email,phone,gender,password,image,channel_id:2})
    }  )

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Registration failed')
    }

    const data= await res.json()
    console.log('register success' , data);
    dispatch(registerSuccess())
    return { success: true, data }

 } catch(error:any) {
  console.log('register error ' , error);
  dispatch(registerFailure(error.message))
  return { success: false, error: error.message }
}
}


