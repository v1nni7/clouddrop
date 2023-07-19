import { Oval } from 'react-loader-spinner'

type LoadingSpinnerProps = {
  width: number
  height: number
  strokeWidth: number
}

export default function LoadingSpinner({
  width,
  height,
  strokeWidth,
}: LoadingSpinnerProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <Oval
        width={width}
        height={height}
        color="#ffffff"
        secondaryColor="#ffffff"
        strokeWidth={strokeWidth}
      />
    </div>
  )
}
