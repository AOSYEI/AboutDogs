import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authApi } from '@/api/authApi';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const schema = z.object({
  email: z.string().email('请输入正确的邮箱地址'),
  password: z.string().min(6, '密码至少 6 位'),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const addToast = useUIStore((state) => state.addToast);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'demo@wangwang.cn',
      password: '123456',
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      login(user);
      addToast({ title: '登录成功', description: '已进入演示体验模式。', tone: 'success' });
      navigate('/me');
    },
    onError: (error) => {
      addToast({ title: '登录失败', description: error.message, tone: 'error' });
    },
  });

  return (
    <div className="mx-auto max-w-xl surface-card p-6 sm:p-8">
      <div className="mb-6">
        <div className="chip chip-active">欢迎回来</div>
        <h1 className="mt-4 text-3xl font-black text-ink">登录汪汪小站</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          当前为前端演示模式，默认示例账号已预填，可直接提交体验完整流程。
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">邮箱</label>
          <input className="form-input" {...register('email')} />
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">密码</label>
          <input type="password" className="form-input" {...register('password')} />
          {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p> : null}
        </div>
        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? '登录中...' : '立即登录'}
        </Button>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <Link to="/auth/forgot-password" className="hover:text-brand-600">忘记密码？</Link>
        <Link to="/auth/register" className="hover:text-brand-600">没有账号，去注册</Link>
      </div>
    </div>
  );
};
