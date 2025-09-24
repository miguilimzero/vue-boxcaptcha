<script setup>
import { computed, onMounted } from 'vue'

const props = defineProps(['sitekey'])
const emit = defineEmits(['render', 'verify', 'expired'])

const randomId = computed(() => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
})

onMounted(() => {
	const script = document.createElement('script')
	script.src = 'https://static.geetest.com/v4/gt4.js'
	;(script.onload = () => {
		initGeetest4({ captchaId: props.sitekey }, captcha => {
			captcha.appendTo('#' + randomId.value)

			captcha
				.onReady(() => {
					emit('render', captcha)
				})
				.onSuccess(() => {
					const answer = captcha.getValidate()

					emit('verify', [answer.lot_number, answer.captcha_output, answer.pass_token, answer.gen_time].join('.'))
				})
				.onError(() => {
					emit('expired')
				})

		})
	}),
		document.head.appendChild(script)
})

const reset = () => {}

defineExpose({
	randomId,
	reset
})
</script>

<template>
	<div :id="randomId"></div>
</template>
