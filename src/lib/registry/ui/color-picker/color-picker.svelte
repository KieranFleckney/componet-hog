<script lang="ts">
    import ColorPicker from 'svelte-awesome-color-picker';
    import { type ColorPickerProps } from './color-picker-props';

    let { color = $bindable(), ...restProps }: ColorPickerProps = $props();
</script>

<div class="color-picker-theme">
    <ColorPicker {...restProps} bind:color />
</div>

<style>
    .color-picker-theme {
        --cp-bg-color: var(--popover);
        --cp-border-color: transparent;
        --cp-text-color: var(--foreground);
        --cp-input-color: var(--input);
        --cp-button-hover-color: var(--accent);
    }
</style>
