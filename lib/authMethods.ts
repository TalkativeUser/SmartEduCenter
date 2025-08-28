import {AppDispatch } from '../store/store'
import {loginStart , loginFailure , loginSuccess , clearError , logout} from '../store/slices/authSlice'







const loginUser=({email,password}:{email:string,password:string})=>  async (dispatch:AppDispatch)=>{

      try{
         dispatch(loginStart())

         const res=await fetch('/api/login' , {

           method:'POST',
           headers:{'Content-Type':"application/json"},
           body:JSON.stringify({email,password})
         }  )

         if (!res.ok)
            throw new Error('invalid credentials' )
//   should be data is User interface type
         const data= await res.json()
         console.log('login prossecc ' , data);
         dispatch(loginSuccess( data ))

      } catch(error:any) {
        
        dispatch(loginFailure(error.message))
      }

}