import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {isNotEmpty, useForm} from "@mantine/form";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {WorkoutService} from "../lib/services/workoutService.ts";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    Container,
    Flex, Grid,
    Group,
    LoadingOverlay,
    NumberInput,
    Radio,
    Table,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {TimePicker} from "@mantine/dates";
import {ArrowRight} from "lucide-react";
import {IconPlus, IconTrash} from "@tabler/icons-react";
import {JSX} from  "react"
import {MealsService} from "../lib/services/mealsService.ts";
import {formatDuration} from "../lib/utils/formatDate.ts";
export const WorkoutForm = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const {state} = useLocation();
    const id: number | null = state?.id ?? null;
    const [error, setError] = useState<string | null>("")
    const navigate = useNavigate();

    const form = useForm<WorkoutSessionDto>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            description: "",
            burnedCalories: 0,
            duration: "",
            workoutType: "RUNTIME",
            pace: null,
            distance: null,
            exercises: []
        },
        validate: {
            name: isNotEmpty("Name must not be empty"),
            description: isNotEmpty("Description must not be empty"),
            burnedCalories: (value) =>
                value && value > 0 ? null : "Burned Calories must be positive number",
            pace: (value) =>
                value == null || value > 0 ? null : "Pace must be positive number",
            distance: (value) =>
                value == null || value > 0 ? null : "Distance must be positive number",
            exercises: [
                {
                    exerciseName: isNotEmpty("Exercise Name is required"),
                    numberOfSets: (value) => value && value > 0 ? null : "Number of sets must be greater than 0",
                    numberOfReps: (value) => value && value > 0 ? null : "Number of sets must be greater than 0",
                    weight: (value) => value && value > 0 ? null : "Weight must be greater than 0",
                }
            ]
        }
    })
    useEffect(() => {
        if (id) {
            fetchWorkout(id).catch((error) => {
                console.error(error)
            })
        }
        const timer = setTimeout(() => setShowForm(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const fetchWorkout = async (id: number) => {
        try {
            const res = await WorkoutService.getWorkout(id);
            form.setValues({
                name: res?.name,
                description: res?.description,
                duration: formatDuration(res?.duration),
                distance: res?.distance,
                burnedCalories: res?.burnedCalories,
                workoutType: res?.workoutType,
                pace: res?.pace,
                exercises: res?.exercises
            })
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch workout",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleSubmit=async (values:WorkoutSessionDto)=>{
        setLoading(true)
        try {
            if(id){
                await WorkoutService.updateWorkout(values,id);
                notifications.show({
                    title: "Workout has been updated",
                    message: "workout was updated successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/workoutSessions")
            }else {
                await WorkoutService.createWorkout(values);
                notifications.show({
                    title: "Workout has been created",
                    message: "workout was created successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/workoutSessions")
            }

        }catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to create or update workout",
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
    const rowFields = form.getValues().exercises.map((exercise, index) => (
        <Grid key={index} gutter="sm" align="center" >
            <Grid.Col span={4}>
                <TextInput
                    placeholder="Bench"
                    withAsterisk
                    key={form.key(`exercises.${index}.exerciseName`)}
                    {...form.getInputProps(`exercises.${index}.exerciseName`)}
                />
            </Grid.Col>
            <Grid.Col span={2}>
                <NumberInput
                    placeholder="Weight"
                    withAsterisk
                    key={form.key(`exercises.${index}.weight`)}
                    {...form.getInputProps(`exercises.${index}.weight`)}
                />
            </Grid.Col>
            <Grid.Col span={2}>
                <NumberInput
                    placeholder="Reps"
                    withAsterisk
                    key={form.key(`exercises.${index}.numberOfReps`)}
                    {...form.getInputProps(`exercises.${index}.numberOfReps`)}
                />
            </Grid.Col>
            <Grid.Col span={2}>
                <NumberInput
                    placeholder="Sets"
                    withAsterisk
                    key={form.key(`exercises.${index}.numberOfSets`)}
                    {...form.getInputProps(`exercises.${index}.numberOfSets`)}
                />
            </Grid.Col>
            <Grid.Col span={1}>
                <ActionIcon
                    color="red"
                    onClick={() => {
                        form.removeListItem("exercises", index);
                        if (form.values.exercises.length === 10) {
                            setError("");
                        }
                    }}
                >
                    <IconTrash size={16} />
                </ActionIcon>
            </Grid.Col>
        </Grid>
    ))
    return (
        <Container size='lg' py="xl">
            <Flex mb="lg" align="center" direction="column" justify="center">
                <Title order={1}
                       className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                    {id ? "Edit a workout" : "Add a workout"}
                </Title>
                <Text c="gray.3" size="lg" mt="md">
                    Please enter your workout below in the form
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
                    Enter your workout
                </Title>
                <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        label="Name"
                        key={form.key('name')}
                        placeholder="Enter your workout name..."
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Description"
                        key={form.key('description')}
                        placeholder="Enter your workout description..."
                        {...form.getInputProps("description")}
                    />
                    <NumberInput
                        label="Burned Calories"
                        key={form.key('burnedCalories')}
                        placeholder="Enter your burned calories..."
                        {...form.getInputProps("burnedCalories")}
                    />
                    <TimePicker
                        label="Duration"
                        key={form.key("duration")}
                        placeholder="Enter your workout duration"
                        withSeconds
                        {...form.getInputProps("duration")}
                    />
                    <Radio.Group
                        key={form.key("workoutType")}
                        label="Workout Type"
                        {...form.getInputProps("workoutType")}

                    >
                        <Group mt="xs" mb="xl">
                            <Radio value="WEIGHT" label="Gym Workout"/>
                            <Radio value="RUNTIME" label="Running Workout"/>
                        </Group>
                    </Radio.Group>

                    {form.values.workoutType == "WEIGHT" ? (
                            <Box maw={1200} mx="auto">
                                <Group justify="center" mt="md" mb="md">
                                    <Button variant={"outline"} onClick={()=>{
                                        if (form.values.exercises.length>=10) {
                                            setError("You cannot add more than ten exercises")
                                            return;
                                        }
                                        form.insertListItem('exercises', { exerciseName: '', weight:'', numberOfReps: 0,numberOfSets:0 })
                                    }}>
                                        <div className="flex items-center justify-center space-x-2">
                                            <span>Add Exercise</span>
                                            <IconPlus size={16}/>
                                        </div>
                                    </Button>
                                </Group>
                                <Grid  gutter="sm" align="center">
                                    <Grid.Col span={4}>
                                        <Text fw={500} size="sm">
                                            Name
                                        </Text>
                                    </Grid.Col>
                                    <Grid.Col span={2}>
                                        <Text fw={500} size="sm">
                                            Weight
                                        </Text>
                                    </Grid.Col>
                                    <Grid.Col span={2}>
                                        <Text fw={500} size="sm">
                                            Number of Reps
                                        </Text>
                                    </Grid.Col>
                                    <Grid.Col span={2}>
                                        <Text fw={500} size="sm">
                                            Number of Sets
                                        </Text>
                                    </Grid.Col>
                                    <Grid.Col span={1}></Grid.Col>
                                </Grid>
                                {rowFields}
                            </Box>
                        ) :
                        (
                            <>
                                <NumberInput
                                    label="Pace"
                                    key={form.key('pace')}
                                    placeholder="Enter your pace..."
                                    {...form.getInputProps("pace")}
                                />
                                <NumberInput
                                    label="Distance"
                                    key={form.key('distance')}
                                    placeholder="Enter your distance..."
                                    {...form.getInputProps("distance")}
                                />
                            </>
                        )
                    }
                    {error && (
                        <Text c="red" size="sm">
                            {error}
                        </Text>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>{id ? "Edit a workout" : "Add a workout"}</span>
                            <ArrowRight size={16}/>
                        </div>
                    </Button>
                </form>
            </Card>
        </Container>
    )
}