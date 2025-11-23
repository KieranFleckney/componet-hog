<script lang="ts" generics="T">
    import {
        FileDropZone,
        type FileDropZoneProps,
    } from '$lib/registry/ui/file-drop-zone';
    import type { BaseInputProps } from '$lib/registry/ui/form';
    import { GenericInput } from '$lib/registry/ui/generic-field';

    type FileInputProps = Omit<FileDropZoneProps, 'onUpload'>;

    let {
        property,
        context,
        // ref = $bindable(null),
        // class: className,
        ...restProps
    }: BaseInputProps<T> & FileInputProps = $props();
</script>

<GenericInput {property} {context} {...restProps}>
    {#snippet control(field)}
        <FileDropZone
            {...restProps}
            onUpload={async (e) => field.handleChange(e)}
        />
    {/snippet}
</GenericInput>
