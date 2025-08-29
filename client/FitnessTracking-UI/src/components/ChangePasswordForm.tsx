import {matches, useForm} from "@mantine/form";
import {Button, Card, LoadingOverlay, Text, TextInput, Title} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {useState} from "react";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";

interface ChangePasswordFormProps {
    showForm: boolean
}

export const ChangedPasswordForm = ({showForm}: ChangePasswordFormProps) => {
    const {forgotPassword} = useAuth();
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const searchParams = new URLSearchParams(window.location.search);
    const resetToken=searchParams.get("token")
    const form = useForm<ChangedPasswordDto>({
        mode: "uncontrolled",
        initialValues: {
            newPassword: "",
            resetPasswordToken:resetToken
        },
        validate: {
            newPassword: matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "Invalid password"),
        }
    });
    const handleSubmit = async (values: ChangedPasswordDto) => {
        setLoading(true)
        setError("")
        try {
            await forgotPassword(values);
            notifications.show({
                title: 'Changed Password',
                message: 'Your password has been successfully changed',
                autoClose: 5000,
                position: 'top-right',
                color: 'green'
            })
          navigate("/login")
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
            <Title order={5} mb="md">
                Please enter your new password
            </Title>
            <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                <TextInput
                    label="New Password"
                    placeholder="Enter your password..."
                    {...form.getInputProps("newPassword")}
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
                        <span>Login</span>
                        <ArrowRight size={16}/>
                    </div>
                </Button>
            </form>
        </Card>
    )
}