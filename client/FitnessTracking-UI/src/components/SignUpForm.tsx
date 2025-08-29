import {hasLength, isEmail, isNotEmpty, matches, useForm} from "@mantine/form";
import {
    Button,
    Card,
    Group,
    LoadingOverlay,
    NumberInput,
    PasswordInput,
    Radio,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {notifications} from "@mantine/notifications";
import {AxiosError} from "axios";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {useState} from "react";


interface SignUpFormProps{
    showForm:boolean
}
export const SignUpForm = ({showForm}:SignUpFormProps) => {
    const [error, setError] = useState<string | null>("")
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const {signup} = useAuth();

    const form = useForm<RegisterUserDto>({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            email: "",
            password: "",
            fullName: "",
            weight: 0,
            height: 0,
            goal: "Lose Weight",
            age: 0,
            gender: "Male",
        },
        validate: {
            fullName: isNotEmpty("Full Name is required"),
            username: hasLength(
                {min: 3, max: 20},
                "Username must be between 3 and 20 characters"
            ),
            password: matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "Invalid password"),
            email: isEmail("Invalid email"),
            weight: (value) =>
                value && value > 0 ? null : "Weight must be greater than 0",
            height: (value) =>
                value && value > 0 ? null : "Height must be greater than 0",
            age: (value) => (value && value > 0 ? null : "Age must be greater than 0"),
            gender: (value) => (value ? null : 'Please select a gender'),
            goal: (value) => (value ? null : 'Please select a goal'),

        },
    });
    const handleSubmit = async (values: RegisterUserDto) => {
        setError("")
        setLoading(true)
        try {
            await signup(values);
            notifications.show({
                title: 'Account Created',
                message: 'User has been created successfully',
                autoClose: 5000,
                position:'top-right',
                color: 'green'
            })
            navigate(`/verify?email=${values.email}`);
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.error || "Something went wrong please try again")
            }
        }
        finally {
            setLoading(false);
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
                Enter your personal information
            </Title>
            <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Full Name"
                    placeholder="Enter your full name..."
                    {...form.getInputProps("fullName")}
                />
                <TextInput
                    label="Username"
                    placeholder="Enter your username..."
                    {...form.getInputProps("username")}
                />
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
                <NumberInput label="Weight (kg)" {...form.getInputProps("weight")} />
                <NumberInput label="Height (cm)" {...form.getInputProps("height")} />
                <NumberInput label="Age" {...form.getInputProps("age")} />
                <Radio.Group
                    label="Goal"
                    {...form.getInputProps("goal")}

                >
                    <Group mt="xs">
                        <Radio value="Maintain Weight" label="Maintain Weight"/>
                        <Radio value="Lose Weight" label="Lose Weight"/>
                        <Radio value="Gain Weight" label="Gain Weight"/>
                    </Group>
                </Radio.Group>
                <Radio.Group
                    label="Gender"
                    {...form.getInputProps("gender")}
                >
                    <Group mt="xs">
                        <Radio value="Male" label="Male"/>
                        <Radio value="Female" label="Female"/>
                    </Group>
                </Radio.Group>
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
                        <span>Register</span>
                        <ArrowRight size={16}/>
                    </div>
                </Button>
            </form>

            <Text size="sm" c="black" mt="md">
                Already have an account? <Link to="/login" className="text-blue-400">Log in</Link>
            </Text>

        </Card>
    )
}
