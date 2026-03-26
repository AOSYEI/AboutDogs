import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { authApi } from '@/api/authApi';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const schema = z
  .object({
    nickname: z.string().min(2, '昵称至少 2 个字符'),
    email: z.string().email('请输入正确的邮箱地址'),
    password: z.string().min(6, '密码至少 6 位'),
    confirmPassword: z.string().min(6, '请再次输入密码'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
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
      nickname: '新手主人',
      email: 'new@wangwang.cn',
      password: '123456',
      confirmPassword: '123456',
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => {
      login(user);
      addToast({ title: '注册成功', description: '欢迎加入汪汪小站。', tone: 'success' });
      navigate('/');
    },
    onError: (error) => {
      addToast({ title: '注册失败', description: error.message, tone: 'error' });
    },
  });

  return (
    <div className="mx-auto max-w-xl surface-card p-6 sm:p-8">
      <div className="mb-6">
        <div className="chip chip-active">创建账号</div>
        <h1 className="mt-4 text-3xl font-black text-ink">注册你的养犬空间</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">注册后可体验个人中心、预约记录、收藏和社区发布等完整前端流程。</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">昵称</label>
          <input className="form-input" {...register('nickname')} />
          {errors.nickname ? <p className="mt-2 text-sm text-rose-600">{errors.nickname.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">邮箱</label>
          <input className="form-input" {...register('email')} />
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">密码</label>
            <input type="password" className="form-input" {...register('password')} />
            {errors.password ? <p className="mt-2 text-sm text-rose-600">{errors.password.message}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">确认密码</label>
            <input type="password" className="form-input" {...register('confirmPassword')} />
            {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-600">{errors.confirmPassword.message}</p> : null}
          </div>
        </div>
        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? '注册中...' : '创建账号'}
        </Button>
      </form>

      <div className="mt-6 text-sm text-slate-500">
        已有账号？<Link to="/auth/login" className="font-semibold text-brand-600">去登录</Link>
      </div>
    </div>
  );
};
