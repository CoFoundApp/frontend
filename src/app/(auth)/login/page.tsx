"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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
    password: z
        .string()
        .min(3, {
            message: "Le mot de passe est obligatoire."
        })
        .min(6, {
            message: "Le mot de passe doit faire 6 caractères minimum."
        }),
})

export default function LoginPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
                <CardTitle>Se connecter</CardTitle>
                <CardDescription>Remplissez les champs ci-dessous pour vous connecter à votre compte.</CardDescription>
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
                                    <FormDescription className="text-primary text-right">
                                        <Link href="/recover-password">Mot de passe oublié ?</Link>
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Se connecter</Button>
                        <p className="text-sm text-center">Vous n'avez pas de compte ? <Link href="/register" className="text-primary">S'inscrire</Link></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
    )
}