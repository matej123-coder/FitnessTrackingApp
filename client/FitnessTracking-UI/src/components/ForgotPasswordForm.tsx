import {isEmail, useForm} from "@mantine/form";
import {Button, Card, LoadingOverlay, Text, TextInput, Title} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {useState} from "react";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {Link} from "react-router-dom";
interface ForgotPasswordFormProps {
    showForm: boolean
}

export const ForgotPasswordForm = ({showForm}: ForgotPasswordFormProps) => {
    const {resetPassword} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const form = useForm<ResetPasswordDto>({
        mode: "uncontrolled",
        initialValues: {
            email: "",
        },
        validate: {
            email: isEmail("Invalid email"),
        }
    });
    const handleSubmit = async (values: ResetPasswordDto) => {
        setLoading(true)
        setError("")
        try {
            await resetPassword(values);
            notifications.show({
                title: 'Link Sent',
                message: 'Please check your inbox',
                autoClose: 5000,
                position: 'top-right',
                color: 'green'
            })

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error || "Something went wrong please try again")
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <Card
            shadow="xl"
            padding="xl"
            radius="md"
            className={`transition-all duration-700 ${
                showForm ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
            }`}
        >
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
            <Title order={3} weight={500} mb="md">
                Forgot your password?
            </Title>
            <Title order={5} mb="md">
                Please enter your email so we can sent you a link
            </Title>
            <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                <TextInput
                    label="Email"
                    placeholder="Enter your email..."
                    {...form.getInputProps("email")}
                />
                {error && (
                    <Text c="red" size="sm">
                        {error}
                    </Text>
                )}
                <Button
                    type="submit"
                    fullWidth
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <span>Send</span>
                        <ArrowRight size={16}/>
                    </div>
                </Button>
            </form>
        </Card>
    )
}