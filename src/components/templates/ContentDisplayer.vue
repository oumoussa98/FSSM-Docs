<template>
	<v-container class="mt-6 d-flex justify-center" fluid>
		<v-card raised>
			<v-tabs v-model="tab" show-arrows height="70px">
				<v-tabs-slider color="teal lighten-3"></v-tabs-slider>
				<v-tab v-for="(smodule, i) in smodules" :key="i">
					{{ smodule }}
				</v-tab>
			</v-tabs>
			<v-tabs-items v-model="tab">
				<!-- <div v-show="!succeed" class="progress">
					<v-progress-circular
						indeterminate
						color="primary"
					></v-progress-circular>
				</div> -->
				<v-tab-item v-for="(dta, i) in data" :key="i">
					<v-card flat>
						<v-treeview
							v-model="tree"
							:open="open"
							:items="dta"
							activatable
							item-key="name"
							open-on-click
						>
							<template v-slot:prepend="{ item, open }">
								<v-icon v-if="!item.file">
									{{
										open ? "mdi-folder-open" : "mdi-folder"
									}}
								</v-icon>
								<v-tooltip bottom>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
											fab
											small
											dark
											text
											color="success"
											v-if="item.file"
											:href="item.href"
											v-bind="attrs"
											v-on="on"
											class="px-0 mx-0"
										>
											<v-icon>
												mdi-download
											</v-icon>
										</v-btn>
									</template>
									<span>Download</span>
								</v-tooltip>
								<v-btn fab small text v-if="item.file">
									<v-icon>
										{{ files[item.file] }}
									</v-icon>
								</v-btn>
							</template>
						</v-treeview>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-card>
	</v-container>
</template>

<script>
import dataGetter from "@/data/DataGetter.js";
export default {
	// props =================
	props: {
		smodules: Array,
		slugs: Array,
		path: String,
	},
	// Data =================
	data: () => ({
		tab: null,
		// treeview
		open: ["public"],
		files: {
			pdf: "mdi-file-pdf",
			txt: "mdi-file-document-outline",
			xls: "mdi-file-excel",
			docx: "mdi-file-word",
			jpg: "mdi-file-image",
			jpeg: "mdi-file-image",
			png: "mdi-file-image",
			html: "mdi-language-html5",
		},
		tree: [],
		data: "",
	}),
	// lifecycle hooks ============

	created() {
		dataGetter.getAllData(this.smodules, this.path, this.slugs);
		this.data = dataGetter.data;
	},
};
</script>
<style>
.progress {
	margin: 50px 0;
	width: 100px;
	height: 50px;
}
.v-progress-circular {
	position: static;
	display: inline-flex;
	vertical-align: middle;
	justify-content: center;
	align-items: center;
}
</style>
