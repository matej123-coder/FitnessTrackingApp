import {Avatar, Badge, Button, Card, Container, Divider, Flex, Group, Stack, Text, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import {useAuth} from "../lib/hooks/useAuth.ts";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {UserService} from "../lib/services/userService.ts";
import {
    IconCake,
    IconGenderBigender,
    IconLogout,
    IconMail,
    IconRuler,
    IconScale,
    IconTarget,
    IconUser,
    IconTrash
} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

export const ProfileDetails = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const {user, logout} = useAuth();
    const navigate =  useNavigate();
    const [userDetails, setUserDetails] = useState<UserResponse>({
        username: '',
        email: '',
        age: 0,
        goal: "",
        fullName: "",
        height: 0,
        weight: 0,
        role: "",
        gender: '',
    })
    useEffect(() => {
        fetchUser(user).catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowForm(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const fetchUser = async (id: number | null) => {
        if (!id) {
            return
        }
        try {
            const res = await UserService.getUser(id)
            setUserDetails(res)
        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to fetch user",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }
    }
    const handleDelete=async (userId:number|null)=>{
        if(!userId){
            return
        }
        try {
            await UserService.deleteUser(userId);
            logout();
            notifications.show({
                title: "Account Deleted",
                message: "user has been deleted successfully",
                autoClose: 5000,
                position: 'top-right',
                color: 'green'
            })
            navigate("/login")
        }
        catch (error){
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to delete user",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        }

    }
    return (
        <Container size='lg' py="xl">
            <Flex mb="lg" align="center" direction="column" justify="center">
                <Title order={1}
                       className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                    Profile User
                </Title>
                <Text c="gray.3" size="lg" mt="md">
                    This is your personal information
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
                <Stack align="center" mb="md">
                    <Avatar
                        size={100}
                        radius={50}
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userDetails.fullName)}&background=7b68ee&color=fff`}
                    />
                    <Text size="xl" fw={700}>
                        {userDetails.fullName}
                    </Text>
                    <Badge color="violet" variant="light" size="lg">
                        {userDetails.role}
                    </Badge>
                </Stack>

                <Divider my="sm"/>

                <Stack spacing="sm">
                    <Group>
                        <IconUser size={18}/>
                        <Text>{userDetails.username}</Text>
                    </Group>
                    <Group>
                        <IconMail size={18}/>
                        <Text>{userDetails.email}</Text>
                    </Group>
                    <Group>
                        <IconCake size={18}/>
                        <Text>{userDetails.age} years old</Text>
                    </Group>
                    <Group>
                        <IconGenderBigender size={18}/>
                        <Text>{userDetails.gender}</Text>
                    </Group>
                    <Group>
                        <IconScale size={18}/>
                        <Text>{userDetails.weight} kg</Text>
                    </Group>
                    <Group>
                        <IconRuler size={18}/>
                        <Text>{userDetails.height} cm</Text>
                    </Group>
                    <Group>
                        <IconTarget size={18}/>
                        <Text>{userDetails.goal}</Text>
                    </Group>
                </Stack>
                <Divider my="lg"/>

                <Stack>
                    <Button
                        leftSection={<IconLogout size={18}/>}
                        variant="gradient"
                        gradient={{from: "blue", to: "cyan"}}
                        radius="md"
                        fullWidth
                        onClick={logout}
                    >
                        Logout
                    </Button>
                    <Button
                        leftSection={<IconTrash size={18}/>}
                        color="red"
                        radius="md"
                        fullWidth
                        onClick={()=>handleDelete(user)}
                    >
                        Delete Account
                    </Button>
                </Stack>
            </Card>
        </Container>
    )
}