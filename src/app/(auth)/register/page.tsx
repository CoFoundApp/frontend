"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    username: z
        .string()
        .min(3, {
            message: "Le nom d'utilisateur est obligatoire."
        }),
    email: z
        .string()
        .min(3, {
            message: "L'adresse e-mail est obligatoire."
        })
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
    password: z
        .string()
        .min(3, {
            message: "Le mot de passe est obligatoire."
        })
        .min(6, {
            message: "Le mot de passe doit faire 6 caractères minimum."
        }),
})

export default function RegisterPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>S'inscrire</CardTitle>
                <CardDescription>Remplissez les champs ci-dessous pour vous créer un compte.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom d'utilisateur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre nom d'utilisateur" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Entrez votre mot de passe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">S'inscrire</Button>
                        <p className="text-sm text-center">Vous avez déjà un compte ? <Link href="/login" className="text-primary">Se connecter</Link></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
    )
}