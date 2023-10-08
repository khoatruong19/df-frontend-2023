/* eslint-disable jsx-a11y/label-has-associated-control */

'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, LoginSchemaType } from '../../utils/schemas'
import { useAuthContext } from '../../providers/AuthProvider'

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const { setIsLogin } = useAuthContext()

  const onSubmit: SubmitHandler<LoginSchemaType> = () => {
    setIsLogin(true)
  }

  const renderLoginForm = () => {
    return (
      <form
        id="loginForm"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <div className="flex items-center">
          <label className="w-[110px] font-semibold ">Email</label>

          <div className="flex flex-col gap-1 w-full ">
            <input
              {...register('email')}
              type="text"
              placeholder="Email..."
              className="py-3 px-4 bg-white rounded-md border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
            />
            {errors.email && (
              <span className="text-xs text-red-400 font-semibold">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="w-[110px] font-semibold">Password</label>

          <div className="flex flex-col gap-1 w-full ">
            <input
              {...register('password')}
              type="password"
              placeholder="Password..."
              className="py-3 px-4 bg-white rounded-md border outline-tertiary outline-offset-2 focus:shadow-lg shadow-tertiary"
            />
            {errors.password && (
              <span className="text-xs text-red-400 font-semibold">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary text-lg mt-2 h-12 text-white font-semibold"
        >
          Login
        </button>
      </form>
    )
  }

  return (
    <section
      id="login-page"
      className="h-full flex items-center justify-center text-black"
    >
      <div className="w-[400px] p-6 bg-primary rounded-md">
        <h1 className="text-4xl font-semibold mb-8 text-center">Bookstore</h1>
        {renderLoginForm()}
      </div>
    </section>
  )
}

export default LoginPage
