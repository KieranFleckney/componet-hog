<script lang="ts" generics="T">
    import { FieldError } from '$lib/components/ui/field';
    import type { BaseInputProps, FieldType } from './form-context.svelte';

    let { field, errorClass }: { field: FieldType<T> } & BaseInputProps<T> =
        $props();
</script>

<FieldError errors={field.state.meta.errors} class={errorClass} />
