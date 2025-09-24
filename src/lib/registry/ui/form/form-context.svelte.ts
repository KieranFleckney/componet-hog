import {
    type DeepKeys,
    FieldApi,
    FormApi,
    type StandardSchemaV1,
    type SvelteFormApi,
    createForm,
    formOptions,
    revalidateLogic,
} from '@tanstack/svelte-form';
import type { Snippet } from 'svelte';

export const DATA_GRID_CONTEXT = Symbol('form-context');

export interface FormProps<T> {
    defaultValues: T;
    fields: Snippet<[FormContext<T>]>;
    OnSubmit: (value: T) => void;
    validator?: StandardSchemaV1<T>;
    enableBrowserValidation?: boolean;
}

export class FormContext<T> {
    form: FormApi<T, any, any, any, any, any, any, any, any, any, any, any> &
        SvelteFormApi<T, any, any, any, any, any, any, any, any, any, any, any>;

    constructor(props: FormProps<T>) {
        const formOpts = formOptions({
            defaultValues: props.defaultValues,
        });

        this.form = createForm(() => ({
            ...formOpts,
            onSubmit: async ({ value }) => {
                props.OnSubmit(value);
            },
            validationLogic: revalidateLogic({
                mode: 'submit',
                modeAfterSubmission: 'change',
            }),
            validators: {
                onDynamic: props.validator,
            },
        }));
    }
}

export type FieldType<T> = FieldApi<T, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>

export type GenericInputProps<T> = {
    control?: Snippet<[FieldType<T>]>;
    custom?: Snippet<[FieldType<T>]>;
    required?: boolean | null | undefined;
};

export type BaseInputProps<T> = {
    property: DeepKeys<T>;
    context: FormContext<T>;
    label?: string;
    description?: string;

    labelClass?: string;
    descriptionClass?: string;
    itemClass?: string;
    errorFieldClass?: string
    errorClass?: string
};