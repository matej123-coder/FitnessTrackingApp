import {useEffect, useState} from "react";
import {Card, Container, Group, Text, Title, Button, Table} from "@mantine/core";
import { IconUser, IconUserExclamation} from "@tabler/icons-react";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {UserService} from "../lib/services/userService.ts";
import {JSX} from "react"
import {useAuth} from "../lib/hooks/useAuth.ts";

export const UsersTable = () => {
    const [showTable, setShowTable] = useState<boolean>(false)
    const [users, setUsers] = useState<UserResponse[]>([])
    const {user} = useAuth();
    useEffect(() => {
        fetchAllUsers().catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const fetchAllUsers = async () => {
        try {
            const res = await UserService.fetchAllUsers();
            setUsers(res)
            setUsers((prevState) => prevState.filter((userDetails) => userDetails.id !== user))
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch users",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const makeAdmin = async (id: number) => {
        try {
            await UserService.makeAdmin(id);
            await fetchAllUsers()
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to Make Admin",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    return (
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>Users</Title>
                    <Text c="gray-300">Here you can view all of the users.</Text>
                </div>
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
                            <Table.Th>Full Name</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Role </Table.Th>
                            <Table.Th>Gender </Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {users.map((user) => (
                            <Table.Tr key={user.id}>
                                <Table.Td>{user.fullName}</Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>{user.role}</Table.Td>
                                <Table.Td>
                                    <Group gap="xs">
                                        <Button
                                            size="xs"
                                            variant="light"
                                            style={{
                                                backgroundColor: user.role == "ADMIN" ? "green" : "blue"
                                            }}
                                            leftSection={user.role == "ADMIN" ? <IconUserExclamation size={16}/> :
                                                <IconUser size={16}/>}
                                            onClick={() => makeAdmin(user.id)}
                                        >
                                            {user.role == "USER" ? "Make Admin" : "Revert To User"}
                                        </Button>
                                    </Group>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </Container>
    )
}