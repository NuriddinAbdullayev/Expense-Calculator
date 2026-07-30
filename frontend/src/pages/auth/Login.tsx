import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { login } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const auth = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm<LoginForm>();

  async function onSubmit(data: LoginForm) {
    try {
      const response = await login(data);

      auth.login(response.token);

      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
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
            Welcome Back
          </h1>

          <p className="mt-1 text-gray-500">
            Login to your account
          </p>
        </div>

        <Input
          label="Email"
          type="email"
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          {...register('password')}
        />

        <Button type="submit">
          Login
        </Button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-green-600"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}