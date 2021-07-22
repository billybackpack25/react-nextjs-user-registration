import * as React from 'react';
import { useForm } from 'react-hook-form';
import reCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

export default function Home() {
  const { register, handleSubmit, formState: { errors }  } = useForm<FormData>({
    defaultValues: {
      name: 'Leigh',
      email: 'used@amil.com',
      password: 'P@a55word!',
      terms: true
    }
  });

  //if (errors) console.log(errors, "Errors");

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [serverErrors, setServerErrors] = React.useState<Array<string>>([]);

  return (
  <form onSubmit={handleSubmit(async (formData)=> {
    setSubmitting(true);
    setServerErrors([]);
    
    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:formData.name,
        email: formData.email,
        password: formData.password,
        terms: formData.terms,

      })
    })

    const data = await response.json();
    if (data.errors) {
      setServerErrors(data.errors)
    } else {
      console.log("Sucessful login, redirect to home page!");
    }

    setSubmitting(false);
  })}>
    
    
    <ul>
    {
      serverErrors && serverErrors.map((error) => (
        <li key={error}>{error}</li>
      ))
    }
    </ul>
    
    
    <div>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" {...register("name", { required: "Required" })} />
      {errors.name && <div style={{color:'red'}}>{errors.name.message}</div>}
    </div>

    <div>
      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" {...register("email", { required: "Required" })} />
      {errors.email && <div>{errors.email.message}</div>}
    </div>

    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password", { 
        required: "Required",
        minLength : {
          value: 8,
          message: "Must be 8 characters"
        },
        validate: (value) => {
          // Needs to match all regex patterns
          return [/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/].every((pattern) => 
            pattern.test(value)) || "must include lower, upper, number, symbol"
        },
      })} />
      {errors.password && <div>{errors.password.message}</div>}
    </div>

    <div>
      <label htmlFor="terms">You must agree to our terms</label>
      <input type="checkbox" id="terms" {...register("terms", { required: "Required: You must agree to our terms" })} />
      {errors.terms && <div>{errors.terms.message}</div>}
    </div>

    


    <div>
      <button type="submit" disabled={submitting}>
        Register
      </button>
    </div>
  </form>
  )
}