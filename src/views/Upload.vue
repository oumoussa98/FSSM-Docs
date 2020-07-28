<template>
	<v-container>
		<v-row>
			<v-col cols="10" offset="1" class="pt-10">
				<form @submit.prevent="uploadFile">
					<v-select
						v-model="level"
						:items="levels"
						label="Level"
					></v-select>
					<v-select
						v-if="level === 'Licence Professionelle'"
						v-model="lpFiliere"
						:items="lpFilieres"
						label="Filieres"
					></v-select>
					<v-select
						v-if="level === 'Licence Fondamental'"
						v-model="filiere"
						:items="lfFilieres"
						label="Filiere"
					></v-select>
					<v-select
						v-if="level === 'Licence Fondamental'"
						v-model="semestre"
						:items="lfsemestres"
						label="Semestre"
					></v-select>
					<v-select
						v-if="level === 'Licence Professionelle'"
						v-model="semestre"
						:items="lpsemestres"
						label="Semestre"
					></v-select>
					{{ getModules() }}
					<v-select
						v-if="
							level === 'Licence Fondamental' &&
								semestre !== '' &&
								filiere !== ''
						"
						v-model="Smodule"
						:items="lfModules"
						label="Module"
					></v-select>

					<v-file-input
						v-model="files"
						counter
						placeholder="Upload your documents"
						label="File input"
						multiple
						prepend-icon="mdi-paperclip"
						:show-size="1000"
						class="mt-10"
					>
						<template v-slot:selection="{ text }">
							<v-chip small label color="primary">
								{{ text }}
							</v-chip>
						</template>
					</v-file-input>
					<v-btn
						class="mr-10 mt-10 px-8 py-4"
						color="success"
						type="submit"
					>
						Upload
					</v-btn>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import * as firebase from "firebase";
import "firebase/storage";
import json from "@/data/data.json";
export default {
	data: () => ({
		files: [],
		levels: json.levels,
		lpFilieres: json.lpFilieres,
		lfsemestres: json.lfsemestres,
		lpsemestres: json.lpsemestres,
		lfFilieres: json.lfFilieres,
		// models
		level: "",
		semestre: "",
		lfModules: [],
		filiere: "",
		Smodule: "",
		lpFiliere: "",
	}),
	methods: {
		uploadFile() {
			this.files.forEach((file) => {
				firebase
					.storage()
					.ref(
						`${this.level}/${this.semestre}/${this.filiere}/${this.Smodule}/${file.name}`
					)
					.put(this.files[0]);
			});
		},
		getModules() {
			if (this.level === "Licence Fondamental")
				switch (this.filiere) {
					case "SMPC":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SMPC.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SMPC.S2;
						}
						break;
					case "SVTU":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SVTU.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SVTU.S2;
						}
						break;
					case "SMIA":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SMIA.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SMIA.S2;
						}
				}
		},
		// getdata() {
		// 	let storageRef = firebase.storage().ref();
		// 	let listRef = storageRef.child("/Licence Fondamental/S1/optique/");

		// 	// Find all the prefixes and items.
		// 	listRef
		// 		.listAll()
		// 		.then(function(res) {
		// 			console.log(res);
		// 			res.items.forEach(function(itemRef) {
		// 				console.log(itemRef.location.path);
		// 			});
		// 		})
		// 		.catch(function(error) {
		// 			console.log(error);
		// 		});
		// },
	},
};
</script>

<style></style>
