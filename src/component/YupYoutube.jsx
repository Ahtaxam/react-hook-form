import React from 'react'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"


const schema = yup.object({
    username:yup.string().required("username is required"),
    email:yup.string().email().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).required("E-mail is required"),
    channel:yup.string().required("Channel name is required"),
})

function YupYoutube() {
    const form = useForm({
        defaultValues:{
            username:"",
            email:"",
            channel:""
        },
        resolver:yupResolver(schema)
    })

    const {register, control, handleSubmit, formState} = form;
    const {errors} = formState;

    const submit = (data) => {
        console.log(data);
    }
  return (
    <div>
        <form onSubmit={handleSubmit(submit)}>
            <div>
                <label htmlFor='username'>userName</label>
                <input 
                    id='username'
                    name='username'
                    type='text'
                    {...register('username')}
                />
                {errors.username?.message}
            </div>
                <br/>
            <div>
                <label htmlFor='email'>E-mail</label>
                <input 
                id='email'
                name='email'
                type='email'
                {...register("email")}
                />
                {errors.email?.message}
            </div>
            <br/>
            <div>
                <label htmlFor='channel'>Channel</label>
                <input 
                id='channel'
                name='channel'
                type='text'
                {...register('channel')}
                />
                {errors.channel?.message}
            </div>

            <button type='submit' >Submit</button>
        </form>
    </div>
  )
}

export default YupYoutube