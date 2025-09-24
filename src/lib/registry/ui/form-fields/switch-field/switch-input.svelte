<script lang="ts" generics="T">
    import { Switch } from '$lib/components/ui/switch';
    import {
        type BaseInputProps,
        FieldErrors,
        FormDescription,
        FormLabel,
    } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/form-fields/generic-field';
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
        <div
            class="flex flex-row items-center justify-between rounded-lg border p-4 aria-invalid:border-destructive"
            aria-invalid={field.state.meta.isValid ? undefined : 'true'}
        >
            <div class="space-y-0.5">
                <FormLabel {context} {property} {field} {...restProps} />
                <FormDescription {context} {property} {field} {...restProps} />
                <FieldErrors {context} {property} {field} {...restProps} />
            </div>
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
        </div>
    {/snippet}
</GenericInput>
