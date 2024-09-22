import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/store/auth";

type AuthHOCOptions = {
  isPrivate: boolean;
};

const AuthHOC = (WrappedComponent: React.FC, options: AuthHOCOptions) => {
  const Return = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const [loading, setLoading] = useState(true);
    const token = useAuthStore((state) => state.token);
    const router = useRouter();
    const { isPrivate } = options;

    useEffect(() => {
      const checkToken = async () => {
        setLoading(false);
      };

      checkToken();
    }, []);

    useEffect(() => {
      if (!loading) {
        if (isPrivate && !token) {
          router.push("/register");
        } else if (!isPrivate && token) {
          router.push("/");
        }
      }
    }, [loading, token, router, isPrivate]);

    if (loading) {
      return <div>Cargando...</div>;
    }

    if (isPrivate && !token) {
      return null;
    }

    if (!isPrivate && token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Return;
};

export default AuthHOC;
