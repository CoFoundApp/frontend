"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { recoverPassword } from "@/services/authService"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    email: z
        .string()
        .min(3, {
            message: "L'adresse e-mail est obligatoire."
        })
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
})

export default function RecoverPasswordPage() {
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await recoverPassword(values);
            toast({
                title: "Réinitialisation du mot de passe réussie !",
                description: "Un e-mail de réinitialisation vous a été envoyé.",
            });
            router.push("/login");
        } catch (error: any) {
            toast({
                title: "Réinitialisation échouée !",
                description: error.message || "Une erreur inattendue est survenue.",
            });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mot de passe oublié ?</CardTitle>
                <CardDescription>Remplissez votre adresse e-mail ci-dessous pour récupérer votre mot de passe.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adresse e-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre adresse e-mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Récupérer votre mot de passe</Button>
                        <p className="text-sm text-center"><Link href="/login" className="text-primary">Retour à la page de connexion</Link></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
    )
}