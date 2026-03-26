import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { profileApi } from '@/api/profileApi';
import { Button } from '@/components/common/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ErrorState } from '@/components/common/ErrorState';
import { LoadingState } from '@/components/common/LoadingState';
import { Modal } from '@/components/common/Modal';
import { SectionIntro } from '@/components/common/SectionIntro';
import { fileToDataUrl, formatDate } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import type { PetProfile } from '@/types';

const profileSchema = z.object({
  nickname: z.string().min(2, '昵称至少 2 个字符'),
  avatar: z.string().url('请填写正确的图片地址').or(z.literal('')),
  bio: z.string().min(10, '简介至少 10 个字'),
  phone: z.string().min(6, '请填写手机或联系方式'),
  email: z.string().email('请输入正确的邮箱地址'),
});

const petSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, '请填写宠物名称'),
  breed: z.string().min(1, '请填写宠物品种'),
  birthday: z.string().min(1, '请选择生日'),
  gender: z.enum(['公', '母']),
  image: z.string().min(1, '请上传宠物照片'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PetFormValues = z.infer<typeof petSchema>;

type TabKey = 'profile' | 'pets' | 'favorites' | 'bookings' | 'posts';

const tabOptions: Array<{ key: TabKey; label: string }> = [
  { key: 'profile', label: '个人资料' },
  { key: 'pets', label: '我的宠物' },
  { key: 'favorites', label: '我的收藏' },
  { key: 'bookings', label: '我的预约' },
  { key: 'posts', label: '我的发布' },
];

const statusColor = {
  待确认: 'bg-amber-50 text-amber-700',
  进行中: 'bg-sky-50 text-sky-700',
  已完成: 'bg-emerald-50 text-emerald-700',
  已取消: 'bg-slate-100 text-slate-600',
};

export const ProfilePage = () => {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);
  const syncAuth = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [petModalOpen, setPetModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [editingPet, setEditingPet] = useState<PetProfile | null>(null);

  const profileQuery = useQuery({ queryKey: ['profile'], queryFn: profileApi.getProfile });
  const petsQuery = useQuery({ queryKey: ['profile-pets'], queryFn: profileApi.getPets });
  const favoritesQuery = useQuery({ queryKey: ['profile-favorites'], queryFn: profileApi.getFavoriteArticles });
  const bookingsQuery = useQuery({ queryKey: ['profile-bookings'], queryFn: profileApi.getBookings });
  const postsQuery = useQuery({ queryKey: ['profile-posts'], queryFn: profileApi.getMyPosts });

  const profileForm = useForm<ProfileFormValues>({ resolver: zodResolver(profileSchema) });
  const petForm = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: { gender: '公', image: '' },
  });

  useEffect(() => {
    if (profileQuery.data) {
      profileForm.reset({
        nickname: profileQuery.data.nickname,
        avatar: profileQuery.data.avatar,
        bio: profileQuery.data.bio,
        phone: profileQuery.data.phone,
        email: profileQuery.data.email,
      });
    }
  }, [profileForm, profileQuery.data]);

  useEffect(() => {
    if (editingPet) {
      petForm.reset(editingPet);
      setPreviewImage(editingPet.image);
    } else {
      petForm.reset({ id: undefined, name: '', breed: '', birthday: '', gender: '公', image: '' });
      setPreviewImage('');
    }
  }, [editingPet, petForm]);

  const profileMutation = useMutation({
    mutationFn: profileApi.updateProfile,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      if (isAuthenticated) {
        syncAuth(user);
      }
      addToast({ title: '资料已更新', description: '个人中心信息已同步保存。', tone: 'success' });
    },
    onError: (error) => addToast({ title: '保存失败', description: error.message, tone: 'error' }),
  });

  const savePetMutation = useMutation({
    mutationFn: profileApi.savePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-pets'] });
      setPetModalOpen(false);
      setEditingPet(null);
      addToast({ title: '宠物档案已保存', tone: 'success' });
    },
    onError: (error) => addToast({ title: '保存失败', description: error.message, tone: 'error' }),
  });

  const deletePetMutation = useMutation({
    mutationFn: profileApi.deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-pets'] });
      addToast({ title: '宠物档案已删除', tone: 'success' });
    },
    onError: (error) => addToast({ title: '删除失败', description: error.message, tone: 'error' }),
  });

  const summary = useMemo(() => {
    return [
      { label: '收藏文章', value: favoritesQuery.data?.length ?? 0 },
      { label: '宠物档案', value: petsQuery.data?.length ?? 0 },
      { label: '预约记录', value: bookingsQuery.data?.length ?? 0 },
      { label: '我的帖子', value: postsQuery.data?.length ?? 0 },
    ];
  }, [bookingsQuery.data?.length, favoritesQuery.data?.length, petsQuery.data?.length, postsQuery.data?.length]);

  if (profileQuery.isLoading) return <LoadingState label="正在加载个人中心..." />;
  if (profileQuery.isError || !profileQuery.data) return <ErrorState onRetry={() => profileQuery.refetch()} />;

  const user = profileQuery.data;

  return (
    <div className="space-y-8">
      <section className="surface-card p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[auto,1fr,auto] lg:items-center">
          <img src={user.avatar} alt={user.nickname} className="h-24 w-24 rounded-full object-cover" />
          <div>
            <div className="chip chip-active">{isAuthenticated ? '已登录' : '演示资料'}</div>
            <h1 className="mt-3 text-3xl font-black text-ink">{user.nickname} 的个人中心</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">{user.bio}</p>
            <p className="mt-2 text-sm text-slate-500">加入时间：{formatDate(user.joinedAt)} · 联系邮箱：{user.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
              <div key={item.label} className="rounded-3xl bg-slate-50 px-4 py-3 text-center">
                <div className="text-2xl font-black text-brand-600">{item.value}</div>
                <div className="mt-1 text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-card p-4 sm:p-6">
        <div className="flex flex-wrap gap-3">
          {tabOptions.map((tab) => (
            <button key={tab.key} className={`chip ${activeTab === tab.key ? 'chip-active' : ''}`} onClick={() => setActiveTab(tab.key)}>
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === 'profile' ? (
        <section className="surface-card p-6 sm:p-8">
          <SectionIntro title="编辑个人资料" description="支持修改头像、昵称、简介和联系方式。" />
          <form className="space-y-5" onSubmit={profileForm.handleSubmit((values) => profileMutation.mutate(values))}>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">昵称</label>
                <input className="form-input" {...profileForm.register('nickname')} />
                {profileForm.formState.errors.nickname ? <p className="mt-2 text-sm text-rose-600">{profileForm.formState.errors.nickname.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">头像 URL</label>
                <input className="form-input" {...profileForm.register('avatar')} />
                {profileForm.formState.errors.avatar ? <p className="mt-2 text-sm text-rose-600">{profileForm.formState.errors.avatar.message}</p> : null}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">简介</label>
              <textarea className="form-textarea" {...profileForm.register('bio')} />
              {profileForm.formState.errors.bio ? <p className="mt-2 text-sm text-rose-600">{profileForm.formState.errors.bio.message}</p> : null}
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">手机 / 联系方式</label>
                <input className="form-input" {...profileForm.register('phone')} />
                {profileForm.formState.errors.phone ? <p className="mt-2 text-sm text-rose-600">{profileForm.formState.errors.phone.message}</p> : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">邮箱</label>
                <input className="form-input" {...profileForm.register('email')} />
                {profileForm.formState.errors.email ? <p className="mt-2 text-sm text-rose-600">{profileForm.formState.errors.email.message}</p> : null}
              </div>
            </div>
            <Button disabled={profileMutation.isPending}>{profileMutation.isPending ? '保存中...' : '保存个人资料'}</Button>
          </form>
        </section>
      ) : null}

      {activeTab === 'pets' ? (
        <section className="space-y-6">
          <section className="surface-card p-6 sm:p-8">
            <SectionIntro
              title="我的宠物"
              description="添加、编辑和删除宠物档案，预约服务时也会更方便。"
              action={<Button onClick={() => { setEditingPet(null); setPetModalOpen(true); }}>新增宠物</Button>}
            />
            {petsQuery.isLoading ? (
              <LoadingState label="正在加载宠物档案..." />
            ) : petsQuery.data?.length ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {petsQuery.data.map((pet) => (
                  <article key={pet.id} className="surface-card overflow-hidden border border-slate-200 p-5">
                    <div className="grid gap-4 sm:grid-cols-[180px,1fr]">
                      <img src={pet.image} alt={pet.name} className="h-48 w-full rounded-3xl object-cover" />
                      <div>
                        <h3 className="text-2xl font-bold text-ink">{pet.name}</h3>
                        <p className="mt-2 text-sm text-slate-500">{pet.breed} · {pet.gender} · {pet.birthday}</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Button variant="secondary" onClick={() => { setEditingPet(pet); setPetModalOpen(true); }}>编辑</Button>
                          <Button variant="ghost" onClick={() => deletePetMutation.mutate(pet.id)}>删除</Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState title="还没有宠物档案" description="先添加一只爱犬，后续预约和记录会更顺手。" action={<Button onClick={() => setPetModalOpen(true)}>马上添加</Button>} />
            )}
          </section>
        </section>
      ) : null}

      {activeTab === 'favorites' ? (
        <section className="surface-card p-6 sm:p-8">
          <SectionIntro title="我的收藏" description="这里会聚合你收藏过的知识文章。" />
          {favoritesQuery.isLoading ? (
            <LoadingState label="正在加载收藏文章..." />
          ) : favoritesQuery.data?.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {favoritesQuery.data.map((article) => (
                <Link key={article.id} to={`/knowledge/article/${article.id}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-brand-200">
                  <div className="chip">{article.category}</div>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{article.summary}</p>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="还没有收藏" description="去知识库点亮一篇你想反复查看的文章吧。" action={<Link className="btn-primary" to="/knowledge">去知识库</Link>} />
          )}
        </section>
      ) : null}

      {activeTab === 'bookings' ? (
        <section className="surface-card p-6 sm:p-8">
          <SectionIntro title="我的预约" description="展示已提交的服务预约记录和当前状态。" />
          {bookingsQuery.isLoading ? (
            <LoadingState label="正在加载预约记录..." />
          ) : bookingsQuery.data?.length ? (
            <div className="space-y-4">
              {bookingsQuery.data.map((booking) => (
                <article key={booking.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{booking.providerName}</h3>
                      <p className="mt-1 text-sm text-slate-500">{booking.serviceName} · {booking.petName}（{booking.petBreed}）</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[booking.status]}`}>{booking.status}</span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                    <div>预约日期：{booking.date}</div>
                    <div>预约时间：{booking.time}</div>
                    <div>创建时间：{formatDate(booking.createdAt)}</div>
                  </div>
                  {booking.note ? <p className="mt-3 text-sm leading-7 text-slate-500">备注：{booking.note}</p> : null}
                </article>
              ))}
            </div>
          ) : (
            <EmptyState title="还没有预约记录" description="去服务大厅选一个合适的训练、医疗或寄养服务吧。" action={<Link className="btn-primary" to="/services">去服务大厅</Link>} />
          )}
        </section>
      ) : null}

      {activeTab === 'posts' ? (
        <section className="surface-card p-6 sm:p-8">
          <SectionIntro title="我的发布" description="这里会展示当前账号或演示资料发布过的帖子。" />
          {postsQuery.isLoading ? (
            <LoadingState label="正在加载我的帖子..." />
          ) : postsQuery.data?.length ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {postsQuery.data.map((post) => (
                <Link key={post.id} to={`/community/post/${post.id}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-brand-200">
                  <h3 className="text-lg font-semibold text-ink">{post.content.slice(0, 36)}...</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">{post.content}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{post.likeCount} 点赞</span>
                    <span>{post.comments.length} 评论</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="你还没有发布帖子" description="去社区分享训练进展、护理经验或服务体验吧。" action={<Link className="btn-primary" to="/community">去社区发帖</Link>} />
          )}
        </section>
      ) : null}

      <Modal
        open={petModalOpen}
        title={editingPet ? '编辑宠物档案' : '新增宠物档案'}
        description="宠物信息会保存在本地，后续预约服务也可以直接参考。"
        onClose={() => {
          setPetModalOpen(false);
          setEditingPet(null);
        }}
      >
        <form className="space-y-5" onSubmit={petForm.handleSubmit((values) => savePetMutation.mutate(values))}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">宠物名称</label>
              <input className="form-input" {...petForm.register('name')} />
              {petForm.formState.errors.name ? <p className="mt-2 text-sm text-rose-600">{petForm.formState.errors.name.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">宠物品种</label>
              <input className="form-input" {...petForm.register('breed')} />
              {petForm.formState.errors.breed ? <p className="mt-2 text-sm text-rose-600">{petForm.formState.errors.breed.message}</p> : null}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">生日</label>
              <input type="date" className="form-input" {...petForm.register('birthday')} />
              {petForm.formState.errors.birthday ? <p className="mt-2 text-sm text-rose-600">{petForm.formState.errors.birthday.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">性别</label>
              <select className="form-select" {...petForm.register('gender')}>
                <option value="公">公</option>
                <option value="母">母</option>
              </select>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">宠物照片</label>
            <input
              type="file"
              accept="image/*"
              className="form-input"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const dataUrl = await fileToDataUrl(file);
                setPreviewImage(dataUrl);
                petForm.setValue('image', dataUrl, { shouldValidate: true });
              }}
            />
            <input type="hidden" {...petForm.register('image')} />
            {petForm.formState.errors.image ? <p className="mt-2 text-sm text-rose-600">{petForm.formState.errors.image.message}</p> : null}
            {previewImage ? <img src={previewImage} alt="宠物预览" className="mt-4 h-44 w-full rounded-3xl object-cover" /> : null}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => { setPetModalOpen(false); setEditingPet(null); }}>取消</Button>
            <Button type="submit" disabled={savePetMutation.isPending}>{savePetMutation.isPending ? '保存中...' : '保存宠物档案'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
