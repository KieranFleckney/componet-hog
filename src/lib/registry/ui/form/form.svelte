<script lang="ts" generics="T">
    import { FormContext, type FormProps } from './form-context.svelte';

    let props: FormProps<T> = $props();
    const context = new FormContext(props);

    //TODO:
    //Nice to have:
    // - combox (I decided not to do this is as all are bit different, I might make a generic one for simple cases)
    // - error summary???
    // - time picker
    // - date range picker
    // - tag input
    // - phone
    // - slider
    // - location
    // - input OTP
</script>

<form
    onsubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        context.form.handleSubmit();
    }}
    class={'flex flex-col gap-4'}
    novalidate={props.enableBrowserValidation ?? true}
>
    {@render props.fields?.(context)}
</form>
