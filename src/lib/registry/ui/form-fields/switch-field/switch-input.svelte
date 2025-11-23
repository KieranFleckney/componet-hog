<script lang="ts" generics="T">
    import { Switch } from '$lib/components/ui/switch';
    import {
        type BaseInputProps,
        FieldErrors,
        FormContent,
        FormDescription,
        FormField,
        FormLabel,
        FormTitle,
    } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';
    import { type WithoutChildrenOrChild } from '$lib/utils';
    import { Switch as SwitchPrimitive } from 'bits-ui';

    let {
        property,
        context,
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        ...restProps
    }: BaseInputProps<T> &
        WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet custom(field)}
        <FormLabel {context} {property} {field} {...restProps}>
            <FormField orientation="horizontal" class={restProps.itemClass}>
                <FormContent>
                    <FormTitle>{restProps.label}</FormTitle>
                    <FormDescription class={restProps.descriptionClass}>
                        {restProps.description}
                    </FormDescription>
                    <FieldErrors {context} {property} {field} {...restProps} />
                </FormContent>
                <Switch
                    bind:ref
                    bind:checked={
                        () => field.state.value, (e) => field.handleChange(e)
                    }
                    name={field.name}
                    id={field.name}
                    onblur={field.handleBlur}
                    class={className}
                    aria-invalid={field.state.meta.isValid ? undefined : 'true'}
                    {...restProps}
                />
            </FormField>
        </FormLabel>
    {/snippet}
</GenericInput>
