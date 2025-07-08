import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AuthForm() {
  const [isSignup, setIsSignup] = useState(true);

  // 🔐 Validation Schemas
  const signupSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
  });

  const signinSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  // 🧠 Formik Setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: isSignup ? signupSchema : signinSchema,
    onSubmit: (values) => {
      if (isSignup) {
        alert("Signed up:\n" + JSON.stringify(values, null, 2));
      } else {
        alert("Signed in:\n" + JSON.stringify(values, null, 2));
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">
        {isSignup ? 'Sign Up' : 'Sign In'}
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label>Name</label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full border p-2"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>
        )}

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full border p-2"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full border p-2"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <p className="text-center">
        {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-600 underline"
        >
          {isSignup ? 'Sign In' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
