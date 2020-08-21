import React from 'react';
import { useForm } from 'react-hook-form';

const Input = ({ label, name, register, placeholder }) => ( 
    <>
        <label>{label}</label>
        <input name={name} 
            placeholder={placeholder} 
            ref={register} 
        />
    </>
);

const Select = React.forwardRef(({ label, name }, ref) => ( 
    <>
        <label>{label}</label>
        <select name={name} ref={ref}>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
        </select>
    </>
));

export default function FormHook() {
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = text => console.log(text);

    return <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Input name="firstname" label="Firstname" placeholder="Your firstname..." 
            register={register({ required: true, maxLength: 20 })} />
        {errors.firstname && <span>This field is required</span>}

        {/* <input name="firstname2" placeholder="Your firstname..."
            ref={register({ required: true, maxLength: 20 })} />
        {errors.firstname && <span>This field is required</span>} */}

        <input name="lastname" placeholder="Your lastname..."
            ref={register({ pattern: /^[A-Za-z]+$/i, required: true })} />
        {errors.lastname && <span>This field is required</span>}

        <Select name="age" label="Age" 
            ref={register({ min: 18, max: 99, required: true })} 
        />

        {/* <input name="age" placeholder="Your age..." type="number" 
            ref={register({ min: 18, max: 99, required: true })} />
        {errors.age && <span>Invalid value supplied</span>} */}

        <button type="submit">Submit</button>
    </form>
}