// import React, { useState , useEffect} from 'react';
import InputField from '../../components/Input';
import Button from '../../components/Button';
import { Link} from 'react-router-dom';
import "./style.css";
// import { request } from '../../utils/request';

const Login = () => {
    //  const [message ,setMessage]= useState("");
    // const navigate = useNavigate();
    // const [login, setLogin] = useState({
    //     email:"",
    //     password:""
    // })
    // const submit = async ()=>{
    //     const response = await request({
    //         method:"POST" ,
    //          path:"login",
    //          data:{
    //            ...login
    //          }
    //         })
    //         if(response.success){
    //             localStorage.setItem("token", `Bearer ${response.user.token}`);
    //             navigate('/home')
    //         }else{
    //                 setMessage(response.response.data.message)
    //         }
    // }
    //  useEffect(()=>{
    //         setTimeout(()=>{
    //             setMessage("")
    //         },2000)
    //     },[message])
    return (
        <>

        <div className='login-body flex align-center justify-center'>
        <div className='flex flex-col justify-center align-center login-card '>
            <h1>Welcome Back!</h1>
            {/* <h3 className='failtext' >{message !== ""?message : ''}</h3> */}
            <InputField
            container='mt-1 width-80'
            label={"Name"}
            type='text'
            placeholder='exapmle@gmail.com'
            // value={login.email}
            // onChange={
            //     (e)=> setLogin({
            //         ...login,
            //         email:e.target.value,
            //     })
            // }
            style="mt-4"
            />
            <InputField
             container='mt-2 width-80'
            label={"password"}
            type='password'
            placeholder='Password'
            // value={login.password}
            // onChange={
            //     (e)=> setLogin({
            //         ...login,
            //         password:e.target.value,
            //     })
            // }
            style="mt-4"
            />
            <div className='form-link mt-3'>
            <p>Create an acount? <Link className='link' to={"/signup"} >Sign UP</Link></p>

            </div>
            <Button
             label="Submit"
            // onClick={submit}
            />
        </div>
        </div>
        </>
    );
};

export default Login;
