interface LoginData {
    email: string;
    password: string;
}

export async function login(params: LoginData): Promise<void> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data = await response.json();
            throw new Error(data.error.message || 'Erreur lors de la connexion.');
        }
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Une erreur réseau est survenue lors de la tentative de connexion.');
        }
    }
}