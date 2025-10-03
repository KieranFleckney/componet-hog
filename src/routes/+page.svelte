<script>
    // @ts-nocheck
    import { page } from '$app/state';
    import Button from '$lib/components/ui/button/button.svelte';
    import Card from '$lib/components/ui/card/card.svelte';
    import * as Code from '$lib/components/ui/code';
    import { PMCommand } from '$lib/components/ui/pm-command';

    const code = `const sayHello = () => {
    console.log('Hello!');`;
</script>

<div class="mx-auto w-full max-w-2xl min-w-0 my-4">
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1">
            <h1 class="text-4xl font-bold">Components</h1>
        </div>
        <Button variant={'ghost'} href="/componet-hog/form">Form</Button>
    </div>
</div>
