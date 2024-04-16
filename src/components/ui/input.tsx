import { cn } from '@/lib/utils'
import { ReactNode, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  prefix?: string
  errors?: FieldError
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const hasError = !!props.errors

    if (props.prefix) {
      return (
        <div>
          <div
            className={cn(
              `transition text-base flex h-16 w-full rounded-md border border-slate-700 bg-slate-800 px-6 py-2  ring-offset-slate-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? 'border-2 border-red-600' : ''} `,
              className,
            )}
          >
            <span className="whitespace-nowrap text-zinc-400">
              {props.prefix}
            </span>
            <input
              type={type}
              className="w-full h-full bg-transparent outline-0"
              ref={ref}
              {...props}
            />
          </div>
          {hasError && (
            <p className="text-start mt-2 text-sm text-red-400">
              {props.errors?.message}
            </p>
          )}
        </div>
      )
    }

    if (props.icon) {
      return (
        <div className="w-full">
          <label className={`w-full h-16 rounded-md border border-slate-700 bg-slate-800 px-6 py-2 flex items-center gap-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1  focus-within:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? ' border border-red-700 /40' : ''}
            `}>
            {props.icon}
            <input
              type={type}
              className={cn(
                `transition flex w-full bg-slate-800 ring-offset-slate-800 outline-none border-none`,
                className,
              )}
              ref={ref}
              {...props}
            />

            {hasError && (
              <p className="text-start mt-2 text-sm text-red-400">
                {props.errors?.message}
              </p>
            )}
          </label>
        </div >
      )
    }

    return (
      <div className='w-full'>
        <input
          type={type}
          className={cn(
            `transition text-base flex h-16 w-full rounded-md border border-slate-700 bg-slate-800 px-6 py-2  ring-offset-slate-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? 'border border-red-700/40' : ''
            }`,
            className,
          )}
          ref={ref}
          {...props}
        />

        {hasError && (
          <p className="text-start mt-2 text-sm text-red-400">
            {props.errors?.message}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }

