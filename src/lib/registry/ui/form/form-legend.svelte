<script lang="ts">
    import { cn, type WithElementRef } from '$lib/utils.js';
    import type { HTMLAttributes } from 'svelte/elements';

    let {
        ref = $bindable(null),
        class: className,
        children,
        ...restProps
    }: WithElementRef<HTMLAttributes<HTMLLegendElement>> = $props();
</script>

<legend
    bind:this={ref}
    class={cn(
        'data-[fs-error]:text-destructive text-sm font-medium leading-none',
        className
    )}
    {...restProps}
>
    {@render children?.()}
</legend>
