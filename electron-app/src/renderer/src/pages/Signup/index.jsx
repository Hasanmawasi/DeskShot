import React, { useEffect, useState } from 'react';
import InputField from '../../components/Input';
import Button from '../../components/Button';
import { Link , useNavigate} from 'react-router-dom';
import "../Login/style.css";
import { request } from '../../utils/request';
import useLogs from '../../hooks/LogsData/useLogs';

const Signup = () => {
    const {SubmitLogs, fetchLogs} = useLogs();
    const [message ,setMessage]= useState("");
    const navigate = useNavigate();
    const [signup, setSignUp] = useState({
        name:'',
        email:"",
        password:""
    })
    const submit = async ()=>{
        try {
            const response = await request({
                method:"POST",
                path:'signup',
                data:{
                    ...signup
                }
            })
           console.log(response);
            if(response?.success){
                localStorage.setItem("token", `Bearer ${response.token}`);
                const logs = await SubmitLogs();
                console.log(logs)
                fetchLogs(logs , "register");
                navigate('/home')
            }else{
                setMessage(response.response.data.message)
            }
        } catch (error) {
            console.log("Erorr", error.response);
        }
    }
    useEffect(()=>{
        setTimeout(()=>{
            setMessage("")
        },2000)
    },[message])
    return (
        <div className='login-body flex align-center justify-center'>
        <div className='flex flex-col justify-center align-center login-card '>
            <h1>Sign Up</h1>
            <h3 className='failtext' >{message !== ""?message : ''}</h3>
            <InputField
            container='mt-1 width-80'
            label={"Name"}
            type='text'
            placeholder='Enter Your Name'
            value={signup.name}
            onChange={
                (e)=> setSignUp({
                    ...signup,
                    name:e.target.value,
                })
            }
            style="mt-4"
            />
            <InputField
             container='mt-2 width-80'
            label={"Email"}
            type='email'
            placeholder='Example@gmail.com'
            value={signup.email}
            onChange={
                (e)=> setSignUp({
                    ...signup,
                    email:e.target.value,
                })
            }
            style="mt-4"
            />
             <InputField
             container='mt-2 width-80'
            label={"Password"}
            type='password'
            placeholder='*******'
            value={signup.password}
            onChange={
                (e)=> setSignUp({
                    ...signup,
                    password:e.target.value,
                })
            }
            style="mt-4"
            />
            <div className='form-link mt-3'>
            <p>Create an acount? <Link to="/login" className='link' >Login </Link></p>

            </div>
            <Button
             label="Sign Up"
            onClick={submit}
            />
        </div>
        </div>
    );
};

export default Signup;
