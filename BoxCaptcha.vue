<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import GeeTest from './GeeTest.vue'
import { VueRecaptcha } from 'vue-recaptcha'
import VueTurnstile from 'vue-turnstile'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'

const props = defineProps({
	onReset: {
		type: Function,
		default: () => {},
	},
	onVerify: {
		type: Function,
		required: true,
	},
	driver: {
		type: String,
		required: true,
	},
	siteKey: {
		type: String,
		required: true,
	},
	theme: {
		type: String,
		default: 'light',
	},
	action: {
		type: String,
		default: null,
	}
})

const loaded = ref(false)
const turnstileDummy = ref('')
const hcaptcha = ref(null)
const recaptcha = ref(null)
const geetest = ref(null)
const turnstile = ref(null)

const isSSRRender = computed(() => {
	return typeof window === 'undefined'
})

onMounted(() => {
	if (props.driver === 'turnstile') {
		loaded.value = true
	}
})

watch(turnstileDummy, (newVal) => {
	props.onVerify(newVal)
})

const reset = () => {
	props.onReset()

	if (props.driver === 'hcaptcha') {
		hcaptcha.value.reset()
	}
	if (props.driver === 'recaptcha') {
		recaptcha.value.reset()
	}
	if (props.driver === 'geetest') {
		geetest.value.reset()
	}
	if (props.driver === 'turnstile') {
		turnstile.value.reset()
	}
}

defineExpose({
	reset
})
</script>

<template>
	<div style="display: flex; justify-content: center;">
		<div style="display: block;">
			<div
				style="
					display: flex;
					align-items: center;
					justify-content: center;
					height: 4rem;
					background-color: #f3f4f6;
					border: 1px solid #d1d5db;
					border-radius: 0.125rem;
					box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
					width: 18rem;
				"
				v-show="isSSRRender || !loaded"
			>
				<span style="font-weight: 500; color: #374151; font-size: 14px;">Loading Captcha...</span>
			</div>

			<template v-if="!isSSRRender">
				<template v-if="driver === 'hcaptcha'">
					<VueHcaptcha
						ref="hcaptcha"
						@verify="onVerify"
						@expired="reset"
						@rendered="id => (loaded = true)"
						:theme="theme"
						:sitekey="siteKey"
						v-show="loaded"
					></VueHcaptcha>
				</template>
				<template v-if="driver === 'recaptcha'">
					<VueRecaptcha
						ref="recaptcha"
						@verify="onVerify"
						@expired="reset"
						@render="id => (loaded = true)"
						:theme="theme"
						:sitekey="siteKey"
						v-show="loaded"
					></VueRecaptcha>
				</template>
				<template v-if="driver === 'turnstile'">
					<VueTurnstile
						ref="turnstile"
						v-model="turnstileDummy"
						:theme="theme"
						:site-key="siteKey"
						:action="action"
						v-show="loaded"
					></VueTurnstile>
				</template>
				<template v-if="driver === 'geetest'">
					<GeeTest
						ref="geetest"
						@verify="onVerify"
						@expired="reset"
						@render="id => (loaded = true)"
						:sitekey="siteKey"
						v-show="loaded"
					>
					</GeeTest>
				</template>
			</template>
		</div>
	</div>
</template>
