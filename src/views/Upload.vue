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
						v-if="
							level === 'Licence Fondamental' && semestre === 'S6'
						"
						v-model="option"
						:items="s6Options"
						label="Option"
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
					<v-select
						v-model="type"
						:items="types"
						label="Type"
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
						class="mr-10 mt-10 px-4 py-4"
						color="#08bb4c"
						type="submit"
						dark
					>
						Upload File(s)
						<v-icon class="px-4" right dark
							>mdi-cloud-upload</v-icon
						>
					</v-btn>

					<v-dialog v-model="dialog" persistent max-width="500px">
						<v-card class="pa-4">
							<v-card-text>
								<v-progress-linear
									class="mt-6"
									v-model="uploadProgress"
									height="20"
									rounded
									color="light-blue lighten-1"
								>
									<strong
										>{{
											Math.ceil(uploadProgress)
										}}%</strong
									>
								</v-progress-linear>
							</v-card-text>
							<v-card-title
								v-if="uploadProgress === 100"
								class="success--text"
							>
								<v-icon class="pr-4" color="success">
									mdi-check
								</v-icon>
								File(s) uploaded successfully
								<v-spacer></v-spacer>
								<v-btn color="primary" @click="dialog = false">
									CLOSE
								</v-btn>
							</v-card-title>
						</v-card>
					</v-dialog>
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
		types: json.types,
		levels: json.levels,
		lpFilieres: json.lpFilieres,
		lfsemestres: json.lfsemestres,
		lpsemestres: json.lpsemestres,
		lfFilieres: json.lfFilieres,
		s6Options: [],
		// models
		files: [],
		level: "",
		semestre: "",
		option: "",
		lfModules: [],
		filiere: "",
		Smodule: "",
		lpFiliere: "",
		uploadProgress: null,
		dialog: false,
		type: "",
	}),
	methods: {
		uploadFile() {
			let vm = this;
			let uploadTask;
			vm.files.forEach((file) => {
				uploadTask = firebase
					.storage()
					.ref(
						`${this.level}/${this.semestre}/${this.filiere}/${this.Smodule}/${this.type}/${file.name}`
					)
					.put(file);
			});
			uploadTask.on("state_changed", function(snapshot) {
				vm.dialog = true;
				vm.uploadProgress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				if (vm.uploadProgress === 100) {
					vm.dialog = true;
					vm.files = [];
				}
			});
		},
		getModules() {
			if (this.level === "Licence Fondamental")
				switch (this.filiere) {
					// SMP
					case "SMP":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SMP.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SMP.S2;
								break;
							case "S3":
								this.lfModules = json.lfmodules.SMP.S3;
								break;
							case "S4":
								this.lfModules = json.lfmodules.SMP.S4;
								break;
							case "S5":
								this.lfModules = json.lfmodules.SMP.S5;
								break;
							case "S6":
								this.s6Options = json.lfmodules.SMP.S6.options;
								switch (this.option) {
									case "Energetique":
										this.lfModules =
											json.lfmodules.SMP.S6.Energetique;
										break;
									case "Physique Moderne":
										this.lfModules =
											json.lfmodules.SMP.S6.PhysiqueModerne;
										break;
									case "Electronique":
										this.lfModules =
											json.lfmodules.SMP.S6.Electronique;
										break;
									case "PhysiquedelaMatiere Condensee":
										this.lfModules =
											json.lfmodules.SMP.S6.PhysiquedelaMatiereCondensee;
										break;
									case "Automatique":
										this.lfModules =
											json.lfmodules.SMP.S6.Automatique;
										break;
								}
						}
						break;
					// SMC
					case "SMC":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SMC.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SMC.S2;
								break;
							case "S3":
								this.lfModules = json.lfmodules.SMC.S3;
								break;
							case "S4":
								this.lfModules = json.lfmodules.SMC.S4;
								break;
							case "S5":
								this.lfModules = json.lfmodules.SMC.S5;
								break;
							case "S6":
								this.s6Options = json.lfmodules.SMC.S6.options;
								switch (this.option) {
									case "Metallurgie":
										this.lfModules =
											json.lfmodules.SMC.S6.Metallurgie;
										break;
									case "Chimie des Materiaux":
										this.lfModules =
											json.lfmodules.SMC.S6.ChimiedesMateriaux;
										break;
									case "Spectroscopie":
										this.lfModules =
											json.lfmodules.SMC.S6.Spectroscopie;
										break;
									case "Chimie Biomoleculaire":
										this.lfModules =
											json.lfmodules.SMC.S6.ChimieBiomoleculaire;
										break;
									case "Metrologie et Qualite":
										this.lfModules =
											json.lfmodules.SMC.S6.MetrologieetQualite;
										break;
									case "Heterocycle et Organometallique-Catalyse":
										this.lfModules =
											json.lfmodules.SMC.S6.HeterocycleetOrganometalliqueCatalyse;
										break;
								}
						}
						break;
					// SVT
					case "SVT":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SVT.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SVT.S2;
								break;
							case "S3":
								this.lfModules = json.lfmodules.SVT.S3;
								break;
							case "S4":
								this.lfModules = json.lfmodules.SVT.S4;
								break;
							case "S5":
								this.lfModules = json.lfmodules.SVT.S5;
								break;
						}
						break;
					// SMI
					case "SMI":
						switch (this.semestre) {
							case "S1":
								this.lfModules = json.lfmodules.SMI.S1;
								break;
							case "S2":
								this.lfModules = json.lfmodules.SMI.S2;
								break;
							case "S3":
								this.lfModules = json.lfmodules.SMI.S3;
								break;
							case "S4":
								this.lfModules = json.lfmodules.SMI.S4;
								break;
							case "S5":
								this.lfModules = json.lfmodules.SMI.S5;
								break;
							case "S6":
								this.lfModules = json.lfmodules.SMI.S6;
								break;
						}
				}
		},
	},
};
</script>
