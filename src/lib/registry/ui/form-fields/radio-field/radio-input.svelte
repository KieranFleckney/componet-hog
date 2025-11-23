<script lang="ts" generics="T">
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { cn } from '$lib/utils';
    import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';

    let {
        property,
        context,
        ref = $bindable(null),
        class: className,
        children,
        itemClass,
        ...restProps
    }: BaseInputProps<T> & RadioGroupPrimitive.RootProps = $props();
</script>

<GenericInput
    {property}
    {context}
    {...restProps}
    itemClass={cn('space-y-3', itemClass)}
>
    {#snippet control(field)}
        <RadioGroup.Root
            bind:ref
            bind:value={() => field.state.value, (e) => field.handleChange(e)}
            name={field.name}
            id={field.name}
            onblur={field.handleBlur}
            class={className}
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            {...restProps}
        >
            {@render children?.()}
        </RadioGroup.Root>
    {/snippet}
</GenericInput>
