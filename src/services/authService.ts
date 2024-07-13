export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface RecoverPasswordData {
  email: string;
}
  
export async function login(params: LoginData): Promise<{ token: string, user: any }> {
  const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  
  if (!loginResponse.ok) {
    const errorData = await loginResponse.json();
    throw new Error(errorData.error.message || 'Erreur lors de la connexion.');
  }
  
  const loginData = await loginResponse.json();
  const token = loginData.data.accessToken;
  
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!userResponse.ok) {
    const errorData = await userResponse.json();
    throw new Error(errorData.error.message || 'Erreur lors de la récupération des données utilisateur.');
  }
  
  const userData = await userResponse.json();
  return { token, ...userData };
}

export async function register(params: RegisterData): Promise<void> {
  const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!registerResponse.ok) {
    const errorData = await registerResponse.json();
    throw new Error(errorData.error.message || "Erreur lors de l'inscription.");
  }
}

export async function recoverPassword(params: RecoverPasswordData): Promise<void> {
  const recoverResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });

  if (!recoverResponse.ok) {
    const errorData = await recoverResponse.json();
    throw new Error(errorData.error.message || "Erreur lors de la réinitialisation du mot de passe.");
  }
}
  
export async function checkAuth(): Promise<any> {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Invalid token');
      }
  
      return await response.json();
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  } else {
    throw new Error('No token found');
  }
}
  