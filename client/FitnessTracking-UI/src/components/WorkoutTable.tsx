import {Badge, Button, Card, Container, Flex, Grid, Group, Pagination, Stack, Table, Text, Title} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {WorkoutService} from "../lib/services/workoutService.ts";
import {JSX} from "react"
import {fromIsoDuration} from "../lib/utils/isoDuration.ts";
export const WorkoutTable=()=>{
    const navigate=useNavigate();
    const [workouts, setWorkouts] = useState<WorkoutResponse[]>([])
    const [showTable, setShowTable] = useState<boolean>(false)
    useEffect(() => {
        fetchAllWorkouts().catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const fetchAllWorkouts = async () => {
        try {
            const res = await WorkoutService.getAllWorkouts();
            setWorkouts(res)
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch workouts",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleDeleteWorkout = async (id: number) => {
        try {
            await WorkoutService.deleteWorkout(id);
            setWorkouts((prevState) => (prevState.filter((workout) => workout.id !== id)) )
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Failed to delete meal", error)
            }
        }
    }
    return(
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>My Workouts</Title>
                    <Text c="gray-300">Here you can view, edit, and manage all of your workouts.</Text>
                </div>
                <Button variant="filled" color="blue" radius="md" onClick={() => navigate("/add-workout")}>
                    + Add Workout
                </Button>
            </Group>

            <Grid>
                {workouts?.map((workout) => (
                    <Grid.Col key={workout.id} span={{ base: 12, sm: 6, md: 4 }}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            className={`transition-all duration-700 ${
                                showTable ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
                            }`}
                        >
                            <Stack gap="sm">
                                <Group justify="space-between" align="flex-start">
                                    <Title order={4}>{workout.name}</Title>
                                    <Badge color="blue" variant="light">
                                        {workout.workoutType}
                                    </Badge>
                                </Group>

                                <Text size="sm" c="dimmed">
                                    Burned Calories: <strong>{workout.burnedCalories}</strong>
                                </Text>
                                <Text size="sm" c="dimmed">
                                    Duration: <strong>{fromIsoDuration(workout.duration)}</strong>
                                </Text>

                                <Group gap="xs" mt="md">
                                    <Button
                                        size="xs"
                                        variant="light"
                                        color="blue"
                                        leftSection={<IconEdit size={16} />}
                                        onClick={() => navigate("/edit-workout", { state: { id: workout.id } })}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="light"
                                        color="red"
                                        leftSection={<IconTrash size={16} />}
                                        onClick={() => handleDeleteWorkout(workout.id)}
                                    >
                                        Delete
                                    </Button>
                                </Group>
                            </Stack>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}