import {Button, Card, Group, LoadingOverlay, Text, TextInput, Title} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {isEmail, isNotEmpty, useForm} from "@mantine/form";
import {useState} from "react";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {Link, useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {JSX} from "react"
import {IconCircleCheckFilled} from "@tabler/icons-react";

interface VerifyFormProps {
    showForm: boolean;
}

export const VerifyForm = ({showForm}: VerifyFormProps) => {
    const [loading, setLoading] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email") ?? "";
    const navigate = useNavigate();
    const {verify, resend} = useAuth();
    const [isResended, setIsResended] = useState<boolean>(false)
    const [calories, setCalories] = useState<number>()
    const [error, setError] = useState("")
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const form = useForm<VerificationDto>({
        mode: "uncontrolled",
        initialValues: {
            email: email,
            verificationCode: ""
        },
        validate: {
            email: isEmail("Please enter a valid email"),
            verificationCode: isNotEmpty("Please enter a verification code")
        }
    })
    const handleSubmit = async (values: VerificationDto) => {
        setLoading(true)
        setError("")
        try {
            const res = await verify(values)
            setCalories(res);
            setIsFinished(true);
            notifications.show({
                title: "Verification Successfull",
                message: "Account has been verified successfully",
                color: "green",
                autoClose: 5000,
                position: "top-right"
            })

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.error || "Something went wrong please try again")
            }
        } finally {
            setLoading(false)
        }
    }
    const handleResend = async (email: string) => {
        setError("")
        setLoading(true)
        try {
            await resend(email)
            setIsResended(true)
            notifications.show({
                title: "Resend successfull",
                message: "Your verification code has been resended",
                color: "green",
                autoClose: 5000,
                position: "top-right"
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.error || "Something went wrong please try again")
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
            {!isFinished ? (
                <>
                    {isResended ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <IconCircleCheckFilled size={56} color="green" />
                            <Title className="text-center text-green-500" order={3}>
                                We have sent a new verification code
                            </Title>
                            <Text size="sm" c="black" className="text-center">
                                Please enter your code
                            </Text>
                        </div>
                    ) : (
                        <>
                            < Title order={3} weight={500} mb="md">
                                Enter your verification code
                            </Title>
                        </>
                    )}

                    <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                        <TextInput
                            label="Verification code"
                            placeholder="Enter your verification code..."
                            {...form.getInputProps("verificationCode")}
                        />
                        {error && (
                            <Text c="red" size="sm">
                                {error}
                            </Text>
                        )}
                        <Button type="submit" fullWidth>
                            <div className="flex items-center justify-center space-x-2">
                                <span>Verify</span>
                                <ArrowRight size={16}/>
                            </div>
                        </Button>
                        <Text size="sm" c="black" className={"text-center"}>
                            Didn't receive a code?{" "}
                            <span onClick={() => handleResend(email)}
                                  className="text-blue-500 font-medium hover:underline cursor-pointer">Resend Verification code</span>
                        </Text>
                    </form>
                </>
            ) : (
                <>
                    <Title order={3} weight={500} mb="md" className="text-green-400">
                        Verification Successful!
                    </Title>
                    <Title order={5} weight={500} mb="md">
                        We have estimated your calorie intake based on your information.
                    </Title>
                    <Text size="md" mb="md">
                        Estimated Calories: <strong>{calories}</strong>
                    </Text>
                    <Button
                        fullWidth
                        className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </Button>
                </>
            )}
        </Card>
    )
}