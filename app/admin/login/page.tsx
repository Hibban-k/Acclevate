import { Suspense } from 'react';
import AdminLoginForm from '@/components/AdminLoginForm';

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <div className="text-text-secondary">Loading...</div>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
