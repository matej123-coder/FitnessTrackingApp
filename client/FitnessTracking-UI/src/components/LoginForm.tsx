import {isEmail, matches, useForm} from "@mantine/form";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Card, Divider, Flex, PasswordInput} from "@mantine/core";
import {Button, LoadingOverlay, TextInput, Title} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";
import {Text} from "@mantine/core";
import {Link} from "react-router-dom";

interface LoginFormProps {
    showForm: boolean
}

export const LoginForm = ({showForm}: LoginFormProps) => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const {login} = useAuth()
    const [loading, setLoading] = useState(false);
    const form = useForm<LoginDto>({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: ""
        },
        validate: {
            password: matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "Invalid password"),
            email: isEmail("Invalid email"),
        }
    });
    const handleSubmit = async (values: LoginDto) => {
        setLoading(true)
        setError("")
        try {
            await login(values);
            notifications.show({
                title: 'Logged in',
                message: 'You have been logged in successfully',
                autoClose: 5000,
                position: 'top-right',
                color: 'green'
            })
            navigate("/dashboard")
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
                Enter your login credentials
            </Title>
            <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>

                <TextInput
                    label="Email"
                    placeholder="Enter your email..."
                    {...form.getInputProps("email")}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Enter your password..."
                    {...form.getInputProps("password")}
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
            <Flex direction="column" align="center" gap="sm" mt="lg">
                <Text size="sm" c="black">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-500 font-medium">Sign up</Link>
                </Text>
                <Divider label="OR"/>
                <Text size="sm" c="black">
                    Forgot Password? <Link to="/forgot-password" className="text-blue-500 text-sm font-medium">Click
                    here</Link>
                </Text>
            </Flex>
        </Card>
    )
}