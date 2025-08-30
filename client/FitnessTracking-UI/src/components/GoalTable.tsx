import {Button, Card, Container, Flex, Group, Pagination, Table, Text, Title,Badge} from "@mantine/core";
import {formatDate} from "../lib/utils/formatDate.ts";
import {IconEdit, IconSearch, IconTrash} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {GoalService} from "../lib/services/goalService.ts";
import {TextInput} from "@mantine/core";
import {JSX} from "react"
export const GoalTable = ()=>{
    const navigate=useNavigate();
    const [goals, setGoals] = useState<GoalResponsePage>({
        content: [],
        pageNo: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });
    const [showTable, setShowTable] = useState<boolean>(false)
    const [searchParam, setSearchParam] = useState<string>("");
    const fetchAllGoals = async (pageSize: number, pageNo: number,searchParam:string='') => {
        try {

            const res = await GoalService.getAllGoals(pageSize, pageNo,searchParam);
            setGoals(res)
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch goals",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleDeleteGoal = async (id: number) => {
        try {
            await GoalService.deleteGoal(id);
            setGoals((prevState) => ({
                ...prevState,
                content: prevState.content.filter((goal) => goal.id !== id)

            }))
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("Failed to delete meal", error)
            }
        }
    }
    const handleChange = (value: number) => {
        fetchAllGoals(goals.pageSize, value - 1,searchParam).catch((error) => {
            console.error(error)
        })
    }
    useEffect(() => {
        fetchAllGoals(3, 0).catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const handleSearch = () => {
        fetchAllGoals(goals.pageSize, 0, searchParam).catch((error) => {
            console.error(error);
        });
    };
    return(
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>My Goals</Title>
                    <Text c="gray-300">Here you can view, edit, and manage all of your goals.</Text>
                </div>
                <Button variant="filled" color="blue" radius="md" onClick={() => navigate("/add-goal")}>
                    + Add Goal
                </Button>
            </Group>
            <Flex mb="md" justify="flex-start">
                <TextInput
                    placeholder="Search goals by title..."
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.currentTarget.value)}
                    leftSection={<IconSearch size={16}/>}
                    radius="md"
                    size="md"
                    style={{ width: "300px" }}
                />
                <Button
                    ml="sm"
                    variant="light"
                    color="blue"
                    radius="md"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Flex>
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
                            <Table.Th>Goal</Table.Th>
                            <Table.Th>Target</Table.Th>
                            <Table.Th>Goal Type</Table.Th>
                            <Table.Th>Start Date</Table.Th>
                            <Table.Th>End Date</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {goals.content.map((goal) => (
                            <Table.Tr key={goal.id}>
                                <Table.Td>{goal.title}</Table.Td>
                                <Table.Td>{goal.targetValue}</Table.Td>
                                <Table.Td>{goal.goal}</Table.Td>
                                <Table.Td>{formatDate(goal.startDate)}</Table.Td>
                                <Table.Td>{formatDate(goal.endDate)}</Table.Td>
                                <Table.Td> <Badge
                                    size="sm"
                                    variant="light"
                                    color={
                                        goal.goalStatus === "IN_PROGRESS"
                                            ? "yellow"
                                            : goal.goalStatus === "FAILED"
                                                ? "red"
                                                : "green"
                                    }
                                >
                                    {goal.goalStatus}
                                </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="blue"
                                            leftSection={<IconEdit size={16}/>}
                                            onClick={() => navigate("/edit-goal", {state: {id: goal.id}})}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="light"
                                            color="red"
                                            leftSection={<IconTrash size={16}/>}
                                            onClick={() => handleDeleteGoal(goal.id)}
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
                    <Pagination total={goals.totalPages} value={goals.pageNo + 1} onChange={handleChange}
                                boundaries={3}/>
                </Flex>
            </Card>
        </Container>
    )
}