import {useEffect, useState} from "react";
import {Container, Text, Title} from "@mantine/core";
import {ChangedPasswordForm} from "../components/ChangePasswordForm.tsx";

export function ChangePassword() {
    const [showForm, setShowForm] = useState<boolean>(false)
    useEffect(() => {
        const timer = setTimeout(() => setShowForm(true), 500)
        return () => clearTimeout(timer)
    }, []);
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex flex-col">
            <section className="flex-1 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div
                        className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                </div>

                <Container size="lg" className="relative z-10">
                    <div className="text-center mb-8 mt-8">
                        <Title order={1}
                               className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                           Change your password
                        </Title>
                        <Text c="gray.3" size="lg" mt="md">
                            Enter your new password so that you can use it on our website
                        </Text>
                    </div>
                    <ChangedPasswordForm showForm={showForm}/>
                </Container>
            </section>
        </div>
    )
}