<script lang="ts" generics="T">
    import {
        DatePicker,
        type DatePickerProps,
    } from '$lib/registry/ui/date-picker';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/form-fields/generic-field';
    import { cn } from '$lib/utils';

    let {
        property,
        context,
        value = $bindable(),
        class: className,
        ...restProps
    }: BaseInputProps<T> & DatePickerProps = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <DatePicker
            date={field.state.value}
            onValueChanged={(e) => field.handleChange(e)}
            name={field.name}
            id={field.name}
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
            class={cn('w-full dark:aria-invalid:border-destructive', className)}
            {...restProps}
        />
    {/snippet}
</GenericInput>
