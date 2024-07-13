interface LoginData {
    email: string;
    password: string;
}

export async function login(params: LoginData, onSuccess: (userData: any) => void): Promise<void> {
    try {
        const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
    
        if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            const token = loginData.data.accessToken;

            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (userResponse.ok) {
                const userData = await userResponse.json();
                onSuccess({ token, ...userData });
            } else {
                const errorData = await userResponse.json();
                throw new Error(errorData.error.message || 'Erreur lors de la récupération des données utilisateur.');
            }
        } else {
            const errorData = await loginResponse.json();
            throw new Error(errorData.error.message || 'Erreur lors de la connexion.');
        }
        } catch (error) {

        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Une erreur réseau est survenue lors de la tentative de connexion.');
        }
    }
}
  
  