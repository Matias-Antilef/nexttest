"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const router = useRouter()

    const onSubmit = handleSubmit(async (data) => {
        if (data.password !== data.confirmPassword) {
            alert('Password not match')
            return;
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            router.push('/auth/login')
        }

    })


    return (
        <div className="w-[calc(100vw-10rem)] m-auto h-screen items-center flex flex-col justify-center">

            <h3 className="text-orange-500 mb-4 text-[4rem]">Register</h3>

            <form className="w-2/4 flex flex-col" onSubmit={onSubmit}>

                <label htmlFor="username" className="text-neutral-500 text-start text-xl mb-3">Username:</label>
                <input type="text" id="username" placeholder="username"
                    className="w-full px-3 py-2 rounded-lg mb-5 placeholder:font-semibold placeholder:text-black text-xl"
                    {...(register("username", {
                        required: {
                            value: true,
                            message: 'username is required'
                        }
                    }))}
                />
                {errors.username && <span className="text-cyan-400 text-xl"> {String(errors.username.message)} </span>}

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


                <label htmlFor="confirmPassword" className="text-neutral-500 text-start text-xl mb-3">Confirm password:</label>
                <input type="password" id="confirmPassword" placeholder="confirm password"
                    className="w-full px-3 py-2 rounded-lg mb-5 placeholder:font-semibold placeholder:text-black text-xl"
                    {...(register("confirmPassword", {
                        required: {
                            value: true,
                            message: 'confirm password is required'
                        }
                    }))}
                />
                {errors.confirmPassword && <span className="text-cyan-400 text-xl"> {String(errors.confirmPassword.message)} </span>}



                <button
                    className="bg-slate-700 mt-3  text-orange-400 rounded-lg text-xl px-3 py-3 w-full"
                >
                    Register
                </button>
            </form>
        </div>
    )
}
export default RegisterPage