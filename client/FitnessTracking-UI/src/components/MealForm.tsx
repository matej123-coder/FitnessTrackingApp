import {Card, Container, Flex, NumberInput, Text, Title,Button} from "@mantine/core"
import {DateInput} from "@mantine/dates"
import {hasLength, isInRange, isNotEmpty, useForm} from "@mantine/form";
import {useEffect, useState} from "react";
import {LoadingOverlay, TextInput} from "@mantine/core";
import {ArrowRight} from "lucide-react";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {MealsService} from "../lib/services/mealsService.ts";
import {useLocation, useNavigate} from "react-router-dom";


export const MealForm = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const {state} = useLocation();
    const id:number | null = state?.id ?? null;
    const navigate=useNavigate();
    useEffect(() => {
        if (id){
            fetchMeal(id).catch((error)=>{
                console.error(error)
            })
        }
        const timer = setTimeout(() => setShowForm(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const form = useForm<MealDto>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            caloriesIntake: 0,
            mealDate: null
        },
        validate: {
            name: hasLength({min: 2, max: 50}, "Name must be between 2 or 50 characters"),
            caloriesIntake: isInRange({min: 1, max: 100000}, "Calories intake must be between 1 and 100000"),
            mealDate: isNotEmpty("Meal date must not be empty")
        }
    })
    const fetchMeal = async (id:number)=>{
        try {
            const res = await MealsService.getMeal(id);
            form.setValues({
                name:res?.name,
                caloriesIntake:res?.caloriesIntake,
                mealDate: res?.mealDate ? new Date(res.mealDate) : null
            })
        }catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch meal",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleSubmit=async (values:MealDto)=>{
        setLoading(true)
        try {
            if(id){
                await MealsService.editMeal(values,id);
                notifications.show({
                    title: "Meal has been updated",
                    message: "meal was updated successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/meals")
            }else {
                await MealsService.createMeal(values);
                notifications.show({
                    title: "Meal has been created",
                    message: "meal was created successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/meals")
            }

        }catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to create or update meal",
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
                    {id ?"Edit a meal" : "Add a meal"}
                </Title>
                <Text c="gray.3" size="lg" mt="md">
                    Please enter your meal below in the form
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
                    Enter your meal
                </Title>
                <form className="space-y-4" onSubmit={form.onSubmit((values) =>handleSubmit(values))}>
                    <TextInput
                        label="Name"
                        key={form.key('name')}
                        placeholder="Enter your meal name..."
                        {...form.getInputProps("name")}
                    />
                    <NumberInput
                    label="Meal calories"
                    key={form.key('caloriesIntake')}
                    placeholder="Enter your meal calories"
                    {...form.getInputProps("caloriesIntake")}
                    />
                    <DateInput
                        clearable
                        label="Meal date"
                        placeholder="Enter when you have eaten this meal"
                        key={form.key('mealDate')}
                        {...form.getInputProps("mealDate")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>{id ? "Edit a meal" : "Add a meal"}</span>
                            <ArrowRight size={16}/>
                        </div>
                    </Button>
                </form>
            </Card>
        </Container>
    )
}