<script lang="ts" generics="T">
    import {
        ColorPicker,
        type ColorPickerProps,
    } from '$lib/registry/ui/color-picker';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';

    let {
        property,
        context,
        color: value = $bindable(),
        ...restProps
    }: BaseInputProps<T> & ColorPickerProps = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <ColorPicker
            bind:color={() => field.state.value, (e) => field.handleChange(e)}
            name={field.name}
        />
    {/snippet}
</GenericInput>
