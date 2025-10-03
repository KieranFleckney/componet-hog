<script>
    // @ts-nocheck
    import { page } from '$app/state';
    import Card from '$lib/components/ui/card/card.svelte';
    import * as Code from '$lib/components/ui/code';
    import { PMCommand } from '$lib/components/ui/pm-command';
    import Example from './example.svelte';
    import codeCode from './example.svelte?raw';

    let code = codeCode
        .replaceAll('$lib/registry/lib/', '$lib/')
        .replaceAll('$lib/registry/ui/', '$lib/components/ui/');
    console.log(codeCode);
</script>

<div class="mx-auto w-full max-w-2xl min-w-0 my-4">
    <div class="flex flex-col gap-5">
        <div class="flex flex-col gap-1">
            <h1 class="text-4xl font-bold">Form</h1>
            <p class="!text-muted-foreground text-lg">
                A tanstack form with Fluentvalidation-ts
            </p>
        </div>

        <h2
            class="scroll-m-20 border-b pb-1 text-2xl font-semibold mt-0"
            id="basic"
            data-toc-index="0"
        >
            Preview
        </h2>

        <div class="border-border w-full rounded-lg border bg-card p-3">
            <Example />
        </div>

        <Code.Overflow>
            <Code.Root lang="svelte" {code}>
                <Code.CopyButton />
            </Code.Root>
        </Code.Overflow>

        <h2
            class="scroll-m-20 border-b pb-1 text-2xl font-semibold mt-0"
            id="basic"
            data-toc-index="0"
        >
            Installation
        </h2>
        <PMCommand
            command="execute"
            args={[
                'shadcn-svelte@latest',
                'add',
                `${page.url.origin}/r/form.json`,
            ]}
        />
    </div>
</div>
