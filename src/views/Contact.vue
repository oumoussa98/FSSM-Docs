<template>
	<layout>
		<div class="container contact">
			<div v-if="successMessage">
				<div class="success col-md-8 offset-2">
					<p>Successfully submited</p>
				</div>
				<h3>
					Thanks for contacting us and don't forget to checkout your
					email !!
				</h3>
			</div>
			<div v-if="errorMessage" class="error col-md-8 offset-2">
				<p>{{ errorMessage }}</p>
			</div>
			<form
				name="contact"
				method="post"
				v-on:submit.prevent="handleSubmit"
				action="/success/"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
			>
				<input type="hidden" name="form-name" value="contact" />
				<p hidden>
					<label>
						Don’t fill this out:
						<input name="bot-field" />
					</label>
				</p>
				<div class="sender-info">
					<div>
						<label for="name" class="label"></label>
						<input
							placeholder="Your name..."
							type="text"
							name="name"
							v-model="formData.name"
							required
						/>
					</div>
					<div>
						<label for="email"></label>
						<input
							placeholder="Your email"
							type="email"
							name="email"
							v-model="formData.email"
							required
						/>
					</div>
				</div>

				<div class="message-wrapper">
					<label for="message"></label>
					<textarea
						rows="4"
						placeholder="Your Message..."
						name="message"
						v-model="formData.message"
						required
					></textarea>
				</div>

				<button type="submit">Send Message</button>
			</form>

			<div>
				<p class="display-3">Or you can text me on</p>
				<div>
					<ul>
						<li>
							<i class="fas fa-phone fa-2x"></i>
							<p>+212 642823650</p>
						</li>
						<li>
							<i class="fas fa-envelope fa-2x"></i>
							<p>abdelwahd.oumouss@gmail.com</p>
						</li>
						<li>
							<i class="fas fa-map-marker-alt fa-2x"></i>
							<p>marrakech, MA 94126, morocco</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</layout>
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
		errorMessage: null,
	}),
	// Methods ======================
	methods: {
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

<style scoped>
.container {
	padding: 20px;
}
.success {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 60px;
	margin: 0 0 40px 0;
	background-color: rgba(93, 230, 104, 0.6);
	border-radius: 6px;
	color: black;
}
.error {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 60px;
	margin: 0 0 40px 0;
	background-color: rgba(230, 93, 93, 0.6);
	border-radius: 10px;
	color: black;
}

input[type="text"],
[type="email"] {
	width: 100%;
	padding: 10px;
	border: none;
	border-bottom: 1px solid grey;
	margin-top: 6px;
	margin-bottom: 16px;
	resize: vertical;
	outline: none;
	background-color: var(--bg);
	color: var(--color);
	transition: background-color 0.5s ease-in-out;
}
textarea {
	display: block;
	width: 100%;
	resize: both;
	min-height: 40px;
	line-height: 20px;
	border: none;
	border-bottom: 1px solid grey;
	padding: 10px;
	margin: 15px 0;
	outline: none;
	background-color: var(--bg);
	color: var(--color);
	transition: background-color 0.5s ease-in-out;
}
::placeholder {
	color: var(--color);
}
button[type="submit"] {
	background-color: #07af4d;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	outline: none;
	transition: box-shadow 0.4s, background-color 0.4s;
}
button[type="submit"]:hover,
input[type="reset"]:hover {
	box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.3);
	background-color: #07a147;
}
.display-3 {
	text-align: center;
}
li {
	display: inline-block;
	margin: 0 20px;
	text-align: center;
}
ul {
	text-align: center;
}
</style>
