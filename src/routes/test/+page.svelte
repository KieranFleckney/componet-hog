<script lang="ts">
    import { Label } from '$lib/components/ui/label';
    import * as RadioGroup from '$lib/components/ui/radio-group';
    import * as ToggleGroup from '$lib/components/ui/toggle-group';
    import { standardFromFluent } from '$lib/registry/lib/fluentvalidation-adapter';
    import { Form, FormArray } from '$lib/registry/ui/form';
    import { CheckboxInput } from '$lib/registry/ui/form-fields/checkbox-field';
    import { ColorPickerInput } from '$lib/registry/ui/form-fields/color-picker-field';
    import { DatePickerInput } from '$lib/registry/ui/form-fields/date-picker-field';
    import { FileInput } from '$lib/registry/ui/form-fields/file-field';
    import { MultiSelectInput } from '$lib/registry/ui/form-fields/multi-select-field';
    import { PasswordInput } from '$lib/registry/ui/form-fields/password-field';
    import { RadioInput } from '$lib/registry/ui/form-fields/radio-field';
    import { SelectInput } from '$lib/registry/ui/form-fields/select-field';
    import { SwitchInput } from '$lib/registry/ui/form-fields/switch-field';
    import { TextInput } from '$lib/registry/ui/form-fields/text-field';
    import { TextareaInput } from '$lib/registry/ui/form-fields/textarea-field';
    import { ToggleGroupInput } from '$lib/registry/ui/form-fields/toggle-group-field';
    import { type DateValue, isSameDay, today } from '@internationalized/date';
    import { Colord } from 'colord';
    import { Validator } from 'fluentvalidation-ts';

    class PersonValidator extends Validator<Person> {
        constructor() {
            super();
            this.ruleFor('name')
                // .notEmpty()
                // .withMessage('Please enter your name')
                .minLength(3);
            this.ruleFor('age')
                .greaterThanOrEqualTo(1)
                .withMessage('Age cannot be negative');

            this.ruleFor('email').emailAddress();
            this.ruleFor('marketing').equal(true).withMessage('Must accept');
            this.ruleFor('sync').equal(true).withMessage('Must accept');
            this.ruleFor('favFruit')
                .must((x) => x?.name === 'Banana')
                .withMessage('wrong! only banana');

            this.ruleFor('birthDay').must((x) => {
                if (!x) {
                    return false;
                }

                return isSameDay(x, today('UTC').add({ days: 2 }));
            });

            this.ruleFor('password').minLength(3);
            // this.ruleForEach('email').emailAddress();
            this.ruleForEach('nicknames').minLength(3);
        }
    }
    const personSchema = standardFromFluent(new PersonValidator());

    type Fruit = {
        name: string;
        colour: string;
    };

    type Person = {
        name: string;
        email: string;
        age: number;
        bio: string;
        marketing: boolean;
        sync: boolean;
        birthDay?: DateValue;
        favFruit?: Fruit;
        favVeg?: string[];
        pic?: File[];
        password: string;
        background: Colord | null;
        title: string;
        payment: string;
        nicknames: string[];
    };

    const person: Person = $state({
        name: '',
        email: 'test@test.com',
        age: 1,
        bio: '',
        marketing: true,
        sync: true,
        pic: undefined,
        favFruit: { name: 'Banana', colour: 'Yellow' },
        favVeg: undefined,
        birthDay: today('UTC').add({ days: 2 }),
        password: 'bebo',
        background: null,
        title: '',
        payment: '',
        nicknames: [],
    });

    const fruits: Fruit[] = [
        { name: 'Apple', colour: 'Green' },
        { name: 'Banana', colour: 'Yellow' },
        { name: 'Orange', colour: 'Orange' },
    ];

    function OnSubmit(value: Person) {
        console.log(person.name);
        console.log(value);
    }
</script>

<div class="w-full max-w-3xl m-auto py-10">
    <Form defaultValues={person} {OnSubmit} validator={personSchema}>
        {#snippet fields(c)}
            <TextInput
                context={c}
                property={'name'}
                label={'Name'}
                description={'his is your public display name'}
            />
            <TextInput
                context={c}
                property={'email'}
                label={'Email'}
                type={'email'}
                required
                description={'Enter your email address'}
            />
            <TextareaInput
                context={c}
                property={'bio'}
                label={'Bio'}
                required
                rows={20}
                description={'Tell us about yourself'}
            />
            <TextInput
                context={c}
                type={'number'}
                property={'age'}
                label={'Age'}
                required
                description={'This is your age'}
            />
            <SwitchInput
                context={c}
                property={'marketing'}
                label={'Marketing Email'}
                description={'Receive emails about new products, features, and more'}
            />
            <CheckboxInput
                context={c}
                property={'sync'}
                label={'Sync Settings'}
                description={'Sync user setting between devices'}
            />
            <SelectInput
                context={c}
                property={'favFruit'}
                label={'Fav Fruit'}
                description={'Your fav fruit in the world'}
                items={fruits}
                toStringFunc={(e) => e.colour}
                toIdFunc={(e) => e.name}
            />
            <MultiSelectInput
                context={c}
                property={'favVeg'}
                label={'Fav Veg'}
                placeholder={'Pick veg'}
                description={'Your fav vegs in the world'}
                items={['Pepper', 'brocille']}
            >
                {#snippet itemTemplate(a, b, c)}
                    <div>
                        <div>
                            {a}
                        </div>
                        <div>some thing speical</div>
                    </div>
                {/snippet}
            </MultiSelectInput>
            <DatePickerInput
                context={c}
                property={'birthDay'}
                label={'Birthday'}
                placeholder={'Pick a date'}
                description={'Select the date of your birthday'}
            />
            <PasswordInput
                context={c}
                property={'password'}
                label={'password'}
                description={'Account password'}
            />
            <FileInput
                context={c}
                property={'pic'}
                label={'Profile Pic'}
                description={'Upload a pic for profile'}
                maxFiles={1}
                fileCount={0}
            />
            <ColorPickerInput
                context={c}
                property={'background'}
                label={'Backgroun color'}
                description={'pick a colour for your background'}
                nullable
            />
            <RadioInput
                context={c}
                property={'title'}
                label={'Title'}
                description={'Select your prefered title'}
            >
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="king" id="option-king" />
                    <Label for="option-king">King</Label>
                </div>
                <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="jester" id="option-jester" />
                    <Label for="option-jester">Jester</Label>
                </div>
            </RadioInput>
            <ToggleGroupInput
                context={c}
                property={'payment'}
                label={'Payment Method'}
                description={'Select your payment'}
                type="single"
            >
                <ToggleGroup.Item value="a">A</ToggleGroup.Item>
                <ToggleGroup.Item value="b">B</ToggleGroup.Item>
                <ToggleGroup.Item value="c">C</ToggleGroup.Item>
            </ToggleGroupInput>
            <FormArray context={c} property={'nicknames'}>
                {#snippet template(d)}
                    <TextInput
                        context={c}
                        property={d}
                        label={'NickName'}
                        description={'Given nicknames'}
                    />
                {/snippet}
            </FormArray>
            <button
                onclick={() => c.form.pushFieldValue('nicknames', 'Test')}
                type="button"
            >
                Add person
            </button>
            <button type="submit">Submit</button>
        {/snippet}
    </Form>
</div>
