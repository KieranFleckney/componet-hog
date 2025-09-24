<script lang="ts" generics="T">
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/form-fields/generic-field';
    import * as Password from '$lib/registry/ui/password';
    import type { HTMLInputAttributes } from 'svelte/elements';

    type Props = Omit<HTMLInputAttributes, 'type'> & {
        type?: 'password';
        files?: undefined;
    };

    let {
        property,
        context,
        ref = $bindable(null),
        value = $bindable(),
        type,
        class: className,
        showStrength = false,
        ...restProps
    }: {
        ref?: HTMLInputElement | null;
        showStrength?: boolean;
    } & BaseInputProps<T> &
        Props = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <Password.Root>
            <Password.Input
                bind:ref
                name={field.name}
                id={field.name}
                bind:value={
                    () => field.state.value, (e) => field.handleChange(e)
                }
                onblur={field.handleBlur}
                aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            >
                <Password.ToggleVisibility />
            </Password.Input>
            {#if showStrength}
                <Password.Strength />
            {/if}
        </Password.Root>
    {/snippet}
</GenericInput>
