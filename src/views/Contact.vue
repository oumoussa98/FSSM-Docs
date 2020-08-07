<template>
	<v-container class="mt-4">
		<v-form ref="form" v-model="valid" lazy-validation>
			<v-text-field
				v-model="name"
				:counter="30"
				:rules="nameRules"
				label="Name"
				filled
				required
				prepend-inner-icon="mdi-account"
			></v-text-field>
			<v-text-field
				v-model="email"
				:rules="emailRules"
				filled
				label="Email address"
				type="email"
				required
				prepend-inner-icon="mdi-email"
			></v-text-field>
			<v-text-field
				v-model="phone"
				filled
				label="Phone number"
				prepend-inner-icon="mdi-phone"
			></v-text-field>
			<v-textarea
				v-model="message"
				:rules="messageRules"
				auto-grow
				filled
				label="Message"
				rows="1"
				prepend-inner-icon="mdi-message"
				required
			></v-textarea>
			<v-btn
				:disabled="!valid"
				color="success"
				class="mr-8 px-8"
				@click="validate"
			>
				Send
			</v-btn>

			<v-btn color="error" class="mr-4" @click="reset">
				Reset Form
			</v-btn>
		</v-form>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		valid: true,
		phone: "",
		name: "",
		nameRules: [
			(v) => !!v || "Name is required",
			(v) =>
				(v && v.length <= 30) || "Name must be less than 30 characters",
		],
		message: "",
		messageRules: [(v) => !!v || "message is required"],
		email: "",
		emailRules: [
			(v) => !!v || "E-mail is required",
			(v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
		],
	}),

	methods: {
		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
	},
};
</script>

<style></style>
