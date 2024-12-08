import { Progress } from "@/components/ui/progress"

export function PasswordStrengthMeter({ password }: { password: string }) {
  const getPasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length > 6) strength += 25
    if (password.match(/[a-z]+/)) strength += 25
    if (password.match(/[A-Z]+/)) strength += 25
    if (password.match(/[0-9]+/)) strength += 25
    return strength
  }

  const strength = getPasswordStrength(password)

  return (
    <div className="space-y-2">
      <Progress value={strength} className="w-full" />
      <p className="text-sm text-gray-500">
        {strength < 50 && "Weak"}
        {strength >= 50 && strength < 75 && "Medium"}
        {strength >= 75 && "Strong"}
      </p>
    </div>
  )
}

