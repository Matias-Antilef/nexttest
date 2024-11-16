"use client"

import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res?.error) {
      return console.error(res.error)
    } else {
      router.push('/dashboard')
      router.refresh()
    }


  })

  return (
    <div className="w-[calc(100vw-10rem)] m-auto h-screen items-center flex flex-col justify-center">

      <h3 className="text-orange-500 mb-4 text-[4rem]">Login</h3>

      <form className="w-2/4 flex flex-col" onSubmit={onSubmit}>

        <label htmlFor="email" className="text-neutral-500 text-start text-xl mb-3">Email:</label>
        <input type="email" id="email" placeholder="email"
          className="w-full px-3 py-2 rounded-lg mb-5 placeholder:font-semibold placeholder:text-black text-xl"
          {...(register("email", {
            required: {
              value: true,
              message: 'email is required'
            }
          }))}
        />
        {errors.email && <span className="text-cyan-400 text-xl"> {String(errors.email.message)} </span>}

        <label htmlFor="password" className="text-neutral-500 text-start text-xl mb-3">Password:</label>
        <input type="password" id="password" placeholder="********"
          className="w-full px-3 py-2 rounded-lg mb-5 placeholder:font-semibold placeholder:text-black text-xl"
          {...(register("password", {
            required: {
              value: true,
              message: 'password is required'
            }
          }))}
        />
        {errors.password && <span className="text-cyan-400 text-xl"> {String(errors.password.message)} </span>}

        <button
          className="bg-slate-700 mt-3  text-orange-400 rounded-lg text-xl px-3 py-3 w-full"
        >
          Login
        </button>
      </form>
    </div>
  )
}
export default LoginPage