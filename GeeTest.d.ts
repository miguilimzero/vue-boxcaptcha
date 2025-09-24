import { DefineComponent } from 'vue'

export interface GeeTestProps {
  sitekey: string
}

export interface GeeTestEmits {
  render: (captcha: any) => void
  verify: (token: string) => void
  expired: () => void
}

export interface GeeTestInstance {
  randomId: string
  reset: () => void
}

declare const GeeTest: DefineComponent<
  GeeTestProps,
  {},
  {},
  {},
  {},
  {},
  {},
  GeeTestEmits,
  {},
  {},
  {},
  {},
  GeeTestInstance
>

export default GeeTest