import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { register as registerUser } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();

  const auth = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm<RegisterForm>();

  async function onSubmit(data: RegisterForm) {
    try {
      const response = await registerUser(data);

      auth.login(response.token);

      navigate('/dashboard');
    } catch (err) {
      alert('Registration failed');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 rounded-xl border bg-white p-8"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-1 text-gray-500">
            Register to start tracking your expenses
          </p>
        </div>

        <Input
          label="Name"
          type="text"
          {...register('name', {
            required: true,
          })}
        />

        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: true,
          })}
        />

        <Input
          label="Password"
          type="password"
          {...register('password', {
            required: true,
            minLength: 6,
          })}
        />

        <Button type="submit">
          Register
        </Button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}