import {Button, Card, Container, Flex, Group, Pagination, Table, Text, Title} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {MealsService} from "../lib/services/mealsService.ts";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {formatDate} from "../lib/utils/formatDate.ts";
import {useNavigate} from "react-router-dom";

export const MealTable = () => {
    const [meals, setMeals] = useState<MealsResponsePage>({
        content: [],
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });
    const navigate = useNavigate();
    const [showTable, setShowTable] = useState<boolean>(false)
    const fetchAllMeals = async (pageSize: number, pageNo: number) => {
        try {

            const res = await MealsService.getAllMeals(pageSize, pageNo);
            setMeals(res)
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch meals",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleChange = (value: number) => {
        fetchAllMeals(meals.pageSize, value - 1).catch((error) => {
            console.error(error)
        })
    }
    const handleDeleteMeal = async (id: number) => {
        try {
            await MealsService.deleteMeal(id);
            setMeals((prevState) => ({
                ...prevState,
                content: prevState.content.filter((meal) => meal.id !== id)

            }))
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Failed to delete meal", error)
            }
        }
    }
    useEffect(() => {
        fetchAllMeals(3, 0).catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>My Meals</Title>
                    <Text c="gray-300">Here you can view, edit, and manage all of your meals.</Text>
                </div>
                <Button variant="filled" color="blue" radius="md" onClick={() => navigate("/add-meal")}>
                    + Add Meal
                </Button>
            </Group>

            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className={`transition-all duration-700 ${
                    showTable ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
                }`}
            >
                <Table striped highlightOnHover withColumnBorders>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Meal</Table.Th>
                            <Table.Th>Calories</Table.Th>
                            <Table.Th>Meal date</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {meals.content.map((meal) => (
                            <Table.Tr key={meal.id}>
                                <Table.Td>{meal.name}</Table.Td>
                                <Table.Td>{meal.caloriesIntake}</Table.Td>
                                <Table.Td>{formatDate(meal.mealDate)}</Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="blue"
                                            leftSection={<IconEdit size={16}/>}
                                            onClick={() => navigate("/edit-meal", {state: {id: meal.id}})}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="red"
                                            leftSection={<IconTrash size={16}/>}
                                            onClick={() => handleDeleteMeal(meal.id)}
                                        >
                                            Delete
                                        </Button>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
                <Flex justify={"center"} mt={"xl"}>
                    <Pagination total={meals.totalPages} value={meals.pageNo + 1} onChange={handleChange}
                                boundaries={3}/>
                </Flex>
            </Card>
        </Container>
    )
}