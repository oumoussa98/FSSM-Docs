<template>
	<v-card raised class="card pt-6 pb-10">
		<h2>{{ title }}</h2>

		<v-btn
			@click="$emit('turnback', shortcut)"
			text
			v-if="back"
			color="blue"
		>
			<v-icon dark left>mdi-arrow-left</v-icon>
		</v-btn>

		<div class="px-10 pt-10">
			<span v-if="shortcut === 'LP'">
				<v-tooltip bottom v-for="(item, i) in items" :key="i">
					<template v-slot:activator="{ on, attrs }">
						<v-btn
							@click="$emit('clicked', shortcut + item)"
							text
							outlined
							rounded
							v-bind="attrs"
							v-on="on"
							placeholder="hello"
							class="ma-1 pa-6"
							>{{ item.name }}</v-btn
						>
					</template>
					<span>{{ item.tooltip }}</span>
				</v-tooltip>
			</span>
			<v-btn
				v-else
				v-for="(item, i) in items"
				:key="i"
				@click="$emit('clicked', shortcut + item)"
				text
				outlined
				rounded
				class="ma-1 pa-6"
				origin="center center"
			>
				{{ item }}
			</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	props: {
		title: String,
		items: Array,
		shortcut: String,
		back: Boolean,
	},
	data: () => ({}),
};
</script>

<style lang="sass">
.card
	min-height: 57vh !important
</style>
