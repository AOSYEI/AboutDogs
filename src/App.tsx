import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { AppShell } from '@/components/layout/AppShell';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { CommunityListPage } from '@/pages/community/CommunityListPage';
import { PostDetailPage } from '@/pages/community/PostDetailPage';
import { ArticleDetailPage } from '@/pages/knowledge/ArticleDetailPage';
import { BreedGuidePage } from '@/pages/knowledge/BreedGuidePage';
import { FeedingGuidePage } from '@/pages/knowledge/FeedingGuidePage';
import { KnowledgeListPage } from '@/pages/knowledge/KnowledgeListPage';
import { SymptomCheckerPage } from '@/pages/knowledge/SymptomCheckerPage';
import { ToiletTrainingPage } from '@/pages/knowledge/ToiletTrainingPage';
import { ProfilePage } from '@/pages/profile/ProfilePage';
import { ServiceDetailPage } from '@/pages/services/ServiceDetailPage';
import { ServiceListPage } from '@/pages/services/ServiceListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/knowledge" element={<KnowledgeListPage />} />
        <Route path="/knowledge/article/:id" element={<ArticleDetailPage />} />
        <Route path="/knowledge/breeds" element={<BreedGuidePage />} />
        <Route path="/knowledge/feeding-guide" element={<FeedingGuidePage />} />
        <Route path="/knowledge/toilet-training" element={<ToiletTrainingPage />} />
        <Route path="/knowledge/symptom-checker" element={<SymptomCheckerPage />} />
        <Route path="/knowledge/:category" element={<KnowledgeListPage />} />
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/community" element={<CommunityListPage />} />
        <Route path="/community/post/:id" element={<PostDetailPage />} />
        <Route path="/me" element={<ProfilePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      </Routes>
    </ErrorBoundary>
  );
}
