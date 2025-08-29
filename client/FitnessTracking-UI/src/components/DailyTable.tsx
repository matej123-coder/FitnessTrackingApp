import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {Button, Card, Container, Flex, Group, Pagination, Table, Text, Title} from "@mantine/core";
import {IconEdit, IconTrash} from "@tabler/icons-react";
import {DailyTrackingService} from "../lib/services/dailyTrackingService.ts";

export const DailyTable = () => {
    const [dailies, setDailies] = useState<DailyTrackingResponsePage>({
        content: [],
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });
    const navigate = useNavigate();
    const [showTable, setShowTable] = useState<boolean>(false)
    const fetchAllDailies = async (pageSize: number, pageNo: number) => {
        try {

            const res = await DailyTrackingService.getAllDaily(pageSize, pageNo);
            setDailies(res)
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch dailies",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleChange = (value: number) => {
        fetchAllDailies(dailies.pageSize, value - 1).catch((error) => {
            console.error(error)
        })
    }
    const handleDeleteMeal = async (id: number) => {
        try {
            await DailyTrackingService.deleteDaily(id);
            setDailies((prevState) => ({
                ...prevState,
                content: prevState.content.filter((daily) => daily.id !== id)

            }))
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Failed to delete meal", error)
            }
        }
    }
    useEffect(() => {
        fetchAllDailies(3, 0).catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>My Daily Activites</Title>
                    <Text c="gray-300">Here you can view, edit, and manage all of your daily trackings.</Text>
                </div>
                <Button variant="filled" color="blue" radius="md" onClick={() => navigate("/dailyTracking")}>
                    + Add Daily
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
                            <Table.Th>Daily Steps</Table.Th>
                            <Table.Th>Daily Water Intake</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {dailies.content.map((daily) => (
                            <Table.Tr key={daily.id}>
                                <Table.Td>{daily.dailySteps}</Table.Td>
                                <Table.Td>{daily.dailyWaterIntake}</Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="blue"
                                            leftSection={<IconEdit size={16}/>}
                                            onClick={() => navigate("/edit-daily", {state: {id: daily.id}})}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="red"
                                            leftSection={<IconTrash size={16}/>}
                                            onClick={() => handleDeleteMeal(daily.id)}
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
                    <Pagination total={dailies.totalPages} value={dailies.pageNo + 1} onChange={handleChange}
                                boundaries={3}/>
                </Flex>
            </Card>
        </Container>
    )
}