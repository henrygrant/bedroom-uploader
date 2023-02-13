<script lang="ts">
	let fileinput: HTMLInputElement;

	const onFileSelected = (e: Event) => {
		let file = e?.target?.files[0];
		let reader = new FileReader();
		const fileName = Math.random().toString(36).slice(-6) + e?.target?.files[0].name;
		reader.readAsArrayBuffer(file);
		reader.onload = async (e) => {
			const content = e.target?.result;
			const CHUNK_SIZE = 3000000;
			const totalChunks = e?.target?.result?.byteLength / CHUNK_SIZE;
			console.log(`total chunks: ${totalChunks}`);
			for (let chunk = 0; chunk < totalChunks; chunk++) {
				let CHUNK = content?.slice(chunk * CHUNK_SIZE, (chunk + 1) * CHUNK_SIZE);
				console.log(`starting chunk #${chunk}`);
				await fetch(`/?${new URLSearchParams({ fn: fileName })}`, {
					method: 'POST',
					headers: {
						'content-type': 'application/octet-stream',
						'content-length': CHUNK?.length || CHUNK?.byteLength
					},
					body: CHUNK
				});
				console.log(`ending chunk #${chunk}`);
			}
		};
	};
</script>

<div id="app">
	<h1>Upload a file</h1>
	<button on:click={() => fileinput.click()}>Clickeydoo</button>
	<input
		style="display:none"
		type="file"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>
</div>

<style>
</style>
