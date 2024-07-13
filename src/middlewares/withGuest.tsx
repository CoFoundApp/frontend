import { useRouter } from 'next/navigation';
import { useEffect, useState, ComponentType } from 'react';
import useUserStore from '../stores/useUserStore';
import { checkAuth } from '../services/authService';
import Loading from '@/components/application/loading';

const withGuest = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const HOC = (props: P) => {
    const router = useRouter();
    const { token, setUser, clearUser } = useUserStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function verifyAuth() {
        try {
          const userData = await checkAuth();
          setUser({ token: localStorage.getItem('token'), ...userData });
        } catch {
          clearUser();
        } finally {
          setLoading(false);
        }
      }

      if (!token) {
        verifyAuth();
      } else {
        setLoading(false);
      }
    }, [clearUser, setUser, token]);

    useEffect(() => {
      if (!loading && token) {
        router.push('/dashboard');
      }
    }, [loading, router, token]);

    if (loading || token) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `withGuest(${getDisplayName(WrappedComponent)})`;
  return HOC;
};

const getDisplayName = (WrappedComponent: ComponentType<any>) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default withGuest;
