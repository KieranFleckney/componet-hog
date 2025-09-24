<script lang="ts">
    import { cn, type WithElementRef } from '$lib/utils.js';
    import type { HTMLAttributes } from 'svelte/elements';
    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLFieldSetElement>> = $props();
</script>

<fieldset bind:this={ref} class={cn('space-y-2', className)} {...restProps}>
    {@render children?.()}
</fieldset>
