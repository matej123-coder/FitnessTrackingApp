import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {isInRange, useForm} from "@mantine/form";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {Button, Card, Container, Flex, LoadingOverlay, NumberInput, Text, Title} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {DailyTrackingService} from "../lib/services/dailyTrackingService.ts";

export const DailyTrackingForm=()=>{
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const {state} = useLocation();
    const id:number | null = state?.id ?? null;
    const navigate=useNavigate();
    useEffect(() => {
        if (id){
            fetchDaily(id).catch((error)=>{
                console.error(error)
            })
        }
        const timer = setTimeout(() => setShowForm(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const form = useForm<DailyTrackingDto>({
        mode: "uncontrolled",
        initialValues: {
            dailyWaterIntake:0,
            dailySteps:0
        },
        validate: {
            dailySteps: isInRange({min: 0, max: 2000000}, "Too much daily steps for one day"),
            dailyWaterIntake: isInRange({min: 0, max: 100000}, "Too much water for one day"),
        }
    })
    const fetchDaily = async (id:number)=>{
        try {
            const res = await DailyTrackingService.getDaily(id);
            form.setValues({
                dailySteps:res?.dailySteps,
                dailyWaterIntake:res?.dailyWaterIntake,
            })
        }catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch daily",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleSubmit=async (values:DailyTrackingDto)=>{
        setLoading(true)
        try {
            if(id){
                await DailyTrackingService.editDaily(values,id);
                notifications.show({
                    title: "Daily has been updated",
                    message: "daily was updated successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/viewHistory")
            }else {
                await DailyTrackingService.createDaily(values);
                notifications.show({
                    title: "Daily has been created",
                    message: "daily was created successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/viewHistory")
            }

        }catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to create or update daily",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <Container size='lg' py="xl">
            <Flex mb="lg" align="center" direction="column" justify="center">
                <Title order={1}
                       className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                    {id ?"Edit a daily" : "Add a daily"}
                </Title>
                <Text c="gray.3" size="lg" mt="md">
                    Please enter your daily tracking below in the form
                </Text>
            </Flex>
            <Card
                shadow="xl"
                padding="xl"
                radius="md"
                maw={500}
                mx="auto"
                className={`transition-all duration-700 ${
                    showForm ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
                }`}
            >
                <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{radius: "sm", blur: 2}}/>
                <Title order={3} weight={500} mb="md">
                    Enter your daily activites
                </Title>
                <form className="space-y-4" onSubmit={form.onSubmit((values) =>handleSubmit(values))}>
                    <NumberInput
                        label="Daily Steps"
                        key={form.key('dailySteps')}
                        placeholder="Enter your dailySteps..."
                        {...form.getInputProps("dailySteps")}
                    />
                    <NumberInput
                        label="Water Intake"
                        key={form.key('dailyWaterIntake')}
                        placeholder="Enter your daily water intake..."
                        {...form.getInputProps("dailyWaterIntake")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>{id ? "Edit a daily" : "Add a daily"}</span>
                            <ArrowRight size={16}/>
                        </div>
                    </Button>
                    <Link to={"/viewHistory"}>
                    <Button
                        mt={10}
                        type="button"
                        variant={"outline"}
                        fullWidth
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>View History</span>
                            <ArrowRight size={16}/>
                        </div>
                    </Button>
                    </Link>
                </form>
            </Card>
        </Container>
    )
}