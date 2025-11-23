<script lang="ts" generics="T">
    import { Checkbox } from '$lib/components/ui/checkbox';
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
    import { Checkbox as CheckboxPrimitive } from 'bits-ui';

    let {
        property,
        context,
        ref = $bindable(null),
        value = $bindable(),
        class: className,
        ...restProps
    }: BaseInputProps<T> &
        WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet custom(field)}
        <!-- <Label
            class="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-invalid=true]]:border-destructive"
        >
            <Checkbox
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
            <div class="grid gap-1.5 font-normal">
                <FormLabel {context} {property} {field} {...restProps} />
                <FormDescription {context} {property} {field} {...restProps} />
                <FieldErrors {context} {property} {field} {...restProps} />
            </div>
        </Label> -->
        <FormLabel {context} {property} {field} {...restProps}>
            <FormField orientation="horizontal" class={restProps.itemClass}>
                <FormContent>
                    <FormTitle>{restProps.label}</FormTitle>
                    <FormDescription class={restProps.descriptionClass}>
                        {restProps.description}
                    </FormDescription>
                    <FieldErrors {context} {property} {field} {...restProps} />
                </FormContent>
                <Checkbox
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
