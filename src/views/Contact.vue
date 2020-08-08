<template>
	<v-container>
		<form
			ref="contact"
			name="contact"
			method="post"
			v-on:submit.prevent="handleSubmit"
			action="/success/"
			data-netlify="true"
		>
			<input type="hidden" name="name" v-model="formData.name" />
			<input type="hidden" name="email" v-model="formData.email" />
			<input type="hidden" name="phone" v-model="formData.email" />

			<textarea
				type="hidden"
				rows="4"
				name="message"
				v-model="formData.message"
			></textarea>
		</form>
		<v-form
			v-on:submit.prevent="handleSubmit"
			ref="form"
			v-model="valid"
			lazy-validation
		>
			<v-text-field
				v-model="formData.name"
				:counter="30"
				:rules="nameRules"
				label="Name"
				filled
				required
				prepend-inner-icon="mdi-account"
			></v-text-field>
			<v-text-field
				v-model="formData.email"
				:rules="emailRules"
				filled
				label="Email address"
				type="email"
				required
				prepend-inner-icon="mdi-email"
			></v-text-field>
			<v-text-field
				v-model="formData.phone"
				filled
				label="Phone number"
				prepend-inner-icon="mdi-phone"
			></v-text-field>
			<v-textarea
				v-model="formData.message"
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
				type="submit"
			>
				Send
			</v-btn>

			<v-btn color="error" class="mr-4" @click="reset">
				Reset Form
			</v-btn>
		</v-form>
	</v-container>
</template>

<script defer>
export default {
	// Meta Info ====================
	metaInfo: {
		title: "Contact",
	},
	// Data =========================
	data: () => ({
		formData: {},
		successMessage: false,
		errorMessage: false,
	}),
	// Methods ======================
	methods: {
		validate() {
			this.$refs.form.validate();
		},
		reset() {
			this.$refs.form.reset();
		},
		Submited() {
			Object.keys(this.formData).forEach((k) => delete this.formData[k]);
			this.$refs.contact.reset();
			this.successMessage = true;
		},
		encode(data) {
			return Object.keys(data)
				.map(
					(key) =>
						encodeURIComponent(key) +
						"=" +
						encodeURIComponent(data[key])
				)
				.join("&");
		},
		handleSubmit(e) {
			fetch("/", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: this.encode({
					"form-name": e.target.getAttribute("name"),
					...this.formData,
				}),
			})
				.then(() => this.Submited())
				.catch((error) => (this.errorMessage = error));
		},
	},
};
</script>
