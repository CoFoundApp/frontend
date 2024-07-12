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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                        <p className="text-sm text-center"><Link href="/login" className="text-primary">Retour à la connexion</Link></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
        
    )
}