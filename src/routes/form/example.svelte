<script lang="ts">
    import { standardFromFluent } from '$lib/registry/lib/fluentvalidation-adapter';
    import { Form } from '$lib/registry/ui/form';
    import { TextInput } from '$lib/registry/ui/form-fields/text-field';
    import { Validator } from 'fluentvalidation-ts';

    class PersonValidator extends Validator<Person> {
        constructor() {
            super();
            this.ruleFor('name').minLength(3);
        }
    }
    const personSchema = standardFromFluent(new PersonValidator());

    type Person = {
        name: string;
    };

    const person: Person = $state({
        name: '',
    });

    function OnSubmit(value: Person) {
        console.log(person.name);
    }
</script>

<Form defaultValues={person} {OnSubmit} validator={personSchema}>
    {#snippet fields(c)}
        <TextInput
            context={c}
            property={'name'}
            label={'Name'}
            description={'Users display name'}
        />
        <button type="submit">Submit</button>
    {/snippet}
</Form>
