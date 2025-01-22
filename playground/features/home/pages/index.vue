<script setup lang="ts">
import { getRandomNumber } from "@f/about/utilities/get-random-number";

const randomNumber = ref(0);

onMounted(() => {
	randomNumber.value = getRandomNumber();
});
</script>

<template>
	<div>
		<h1>Home</h1>
		<p>Welcome to the home page</p>
		<p>Random number from another feature utility: {{ randomNumber }}</p>
	</div>
</template>
