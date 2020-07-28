<template>
	<v-container class="mt-10">
		<v-row class="text-center">
			<v-col>
				<Card
					@clicked="change($event)"
					@turnback="turnback($event)"
					title="licence  Fondamentale"
					:items="lfItems"
					shortcut="LF"
					:back="lfback"
				/>
			</v-col>

			<v-col>
				<Card
					@clicked="change($event)"
					title="licence professionnelle"
					:items="lpItems"
					shortcut="LP"
					:back="lpback"
				/>
			</v-col>
		</v-row>
		<v-row class="text-center">
			<v-col>
				<Card
					@clicked="change($event)"
					title="Master"
					:items="masterItems"
					shortcut="master"
					:back="masterback"
				/>
			</v-col>

			<v-col>
				<Card
					@clicked="change($event)"
					title="Doctorat"
					:items="doctoratItems"
					shortcut="doctorat"
					:back="doctoratback"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Card from "@/components/cards/LevelCard";
export default {
	name: "Home",
	components: {
		Card,
	},
	data: () => ({
		lfItems: ["s1", "s2", "s3", "s4", "s5", "s6"],
		lpItems: [
			{ name: "LP-OO", tooltip: "Optique Optométrie" },
			{
				name: "LP-3ER",
				tooltip: "Efficacité Énergétique et Énergies Renouvelables",
			},
			{
				name: "LP-TCBTP",
				tooltip:
					"Technologie et Coordination dans le Bâtiment & les Travaux Publics",
			},
			{
				name: "LP-STADLS",
				tooltip:
					"Sciences et Techniques de l’Assainissement des Déchets Liquides et Solides",
			},
			{ name: "LP-CV", tooltip: "Céramiques et Verres" },
			{ name: "LP-ACQ", tooltip: "Analyse Chimique et Qualité" },
			{
				name: "LP-R2MV",
				tooltip: "Ressources Minières Marocaines et Valorisation",
			},
			{
				name: "LP-R2SI",
				tooltip: "Réseaux et Sécurité des Systèmes Informatiques",
			},
			{ name: "LP-TPW", tooltip: "Technologies et Programmation Web" },
			{ name: "LP-GRN", tooltip: "Géo-environnement & Risques Naturels" },
			{
				name: "LP-EOES",
				tooltip: "Electronics Optics for Empedded Systemes",
			},
		],
		masterItems: ["s7", "s8", "s9", "s10"],
		doctoratItems: ["s1", "s2", "s3", "s4", "s5", "s6"],
		lfs1s2: ["smpc", "svtu", "smia"],
		lfs3s4: ["smp", "smc", "svi", "stu", "sma", "smi"],
		lfs5s6: ["smp", "smc", "svi", "stu", "sma", "smi"],
		lfback: false,
		lpback: false,
		masterback: false,
		doctoratback: false,
	}),
	methods: {
		change(item) {
			switch (item) {
				case "LFs1":
				case "LFs2":
					this.lfItems = this.lfs1s2;
					this.lfback = true;
					break;
				case "LFs3":
				case "LFs4":
				case "LFs5":
				case "LFs6":
					this.lfItems = this.lfs3s4;
					this.lfback = true;
			}
		},
		turnback(shortcut) {
			switch (shortcut) {
				case "LF":
					this.lfItems = ["s1", "s2", "s3", "s4", "s5", "s6"];
					this.lfback = false;
					break;
				case "LP":
					this.lpItems = ["s3", "s4", "s5", "s6"];
					this.lpback = true;
			}
		},
	},
};
</script>
