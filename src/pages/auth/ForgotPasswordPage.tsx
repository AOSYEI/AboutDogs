import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { authApi } from '@/api/authApi';
import { Button } from '@/components/common/Button';
import { useUIStore } from '@/stores/uiStore';

const schema = z.object({
  email: z.string().email('请输入正确的邮箱地址'),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const addToast = useUIStore((state) => state.addToast);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'demo@wangwang.cn' },
  });

  const mutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: (result) => {
      addToast({ title: '邮件已发送', description: result.message, tone: 'success' });
    },
    onError: (error) => {
      addToast({ title: '提交失败', description: error.message, tone: 'error' });
    },
  });

  return (
    <div className="mx-auto max-w-xl surface-card p-6 sm:p-8">
      <div className="mb-6">
        <div className="chip chip-active">找回密码</div>
        <h1 className="mt-4 text-3xl font-black text-ink">重置账号密码</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">演示模式下不会真的发邮件，但会模拟完整的提交与反馈流程。</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">注册邮箱</label>
          <input className="form-input" {...register('email')} />
          {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email.message}</p> : null}
        </div>
        <Button className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? '提交中...' : '发送找回邮件'}
        </Button>
      </form>

      <div className="mt-6 text-sm text-slate-500">
        <Link to="/auth/login" className="font-semibold text-brand-600">返回登录</Link>
      </div>
    </div>
  );
};
