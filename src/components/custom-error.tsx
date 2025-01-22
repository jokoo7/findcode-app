import React from 'react'

interface IProps {
  message: string | undefined
}

const CustomError = ({ message }: IProps) => {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1 className="text-2xl font-bold text-red-500">Terjadi Kesalahan!!!</h1>
      <span className="inline-block text-center italic text-muted-foreground">
        &quot;{message}&quot;
      </span>
    </section>
  )
}

export default CustomError
