import { Suspense } from 'react';
import AdminLoginForm from '@/app/components/AdminLoginForm';

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-slate-600">Loading...</div>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
