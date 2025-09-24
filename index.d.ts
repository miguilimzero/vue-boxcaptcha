import { DefineComponent } from 'vue'

declare module '@miguilim/vue-boxcaptcha' {
  export type CaptchaDriver = 'hcaptcha' | 'recaptcha' | 'turnstile' | 'geetest'
  export type CaptchaTheme = 'light' | 'dark'

  export interface BoxCaptchaProps {
    /**
     * Callback function called when captcha is reset
     */
    onReset?: () => void
    /**
     * Callback function called when captcha is verified
     * @param token - The verification token
     */
    onVerify: (token: string) => void
    /**
     * The captcha driver to use
     */
    driver: CaptchaDriver
    /**
     * The site key for the captcha service
     */
    siteKey: string
    /**
     * The theme for the captcha widget
     * @default 'light'
     */
    theme?: CaptchaTheme
    /**
     * Action parameter for Turnstile captcha
     */
    action?: string | null
  }

  export interface BoxCaptchaInstance {
    /**
     * Reset the captcha widget
     */
    reset(): void
  }

  declare const BoxCaptcha: DefineComponent<
    BoxCaptchaProps,
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    BoxCaptchaInstance
  >

  export default BoxCaptcha
}

declare module 'vue' {
  export interface GlobalComponents {
    BoxCaptcha: typeof import('@miguilim/vue-boxcaptcha').default
  }
}