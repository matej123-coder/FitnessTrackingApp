import {
    RingProgress,
    Center,
    Group,
    Text,
    Title,
    Container,
    Select,
    Card,
    Divider,
    SimpleGrid,
    Flex, Badge,
    Progress
} from "@mantine/core";
import {getUsername} from "../lib/utils/jwtValidToken.ts";
import {useEffect, useState} from "react";
import {DashboardService} from "../lib/services/dashboardService.ts";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {PieChart} from "@mantine/charts";
import {IconCheck} from "@tabler/icons-react";
import {JSX} from "react"
export const DashboardComponent = () => {
    const [showTable, setShowTable] = useState<boolean>(false)
    const [period, setPeriod] = useState<string>("all")
    const token = localStorage.getItem("token")
    const userName = getUsername(token);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
    const progressSteps = Math.min((dashboardData?.["stepsCompleted"] / dashboardData?.["stepsGoal"]) * 100, 100);
    const isGoalReachedSteps = dashboardData?.["stepsCompleted"] >= dashboardData?.["stepsGoal"];
    const progressBurnedCalories = Math.min((dashboardData?.["burnedCalories"] / dashboardData?.["burnedCaloriesGoal"]) * 100, 100);
    const isGoalReachedBurnedCalories = dashboardData?.["burnedCalories"] >= dashboardData?.["burnedCaloriesGoal"];
    const progressCaloriesIntake = Math.min((dashboardData?.["caloriesIntake"] / dashboardData?.["caloriesIntakeGoal"]) * 100, 100);
    const isGoalCaloriesIntake = dashboardData?.["caloriesIntake"] >= dashboardData?.["caloriesIntakeGoal"];
    const WATER_GOAL = 4
    const progressWater = Math.min((dashboardData?.["waterIntake"] / WATER_GOAL) * 100, 100);
    const isGoalMet = dashboardData?.["waterIntake"] >= WATER_GOAL;
    useEffect(() => {
        fetchDashboardData(period).catch((error) => {
            console.error(error)
        })
        const timer = setTimeout(() => setShowTable(true), 500);
        return () => clearTimeout(timer);
    }, [period]);
    const fetchDashboardData = async (param: string) => {
        try {
            const res = await DashboardService.dashboardData(param);
            setDashboardData(res)
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
    console.log(period)
    return (
        <Container size="lg" py="xl">
            <Group mb="lg" align="center" justify="space-between">
                <div>
                    <Title order={2}>Welcome {userName}</Title>
                    <Text c="gray-300">Here you can view your progress based on your goals.</Text>
                </div>
                <Select
                    label="Sort By"
                    defaultValue="all"
                    value={period}
                    onChange={(value)=> setPeriod(value)}
                    placeholder="Pick value"
                    data={['all', 'daily', 'monthly', 'weekly']}
                />
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
                <Group position="apart" mb="md">
                    <Title order={3}>Dashboard Overview</Title>
                </Group>
                <Divider mb="md"/>
                <SimpleGrid
                    cols={{base: 1, sm: 2, md: 3}}
                    spacing="lg"
                >
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"

                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Your fitness overview
                            </Text>
                            <PieChart
                                size={160}
                                withTooltip
                                data={[
                                    {
                                        name: "Workout Sessions",
                                        value: dashboardData?.["workoutSessions"] ?? 20,
                                        color: "purple"
                                    },
                                    {name: "Meals", value: dashboardData?.["meals"] ?? 20, color: "cyan"},
                                    {name: "Goals", value: dashboardData?.["goals"] ?? 20, color: "green"}
                                ]}
                            />
                        </Flex>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"

                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Status of goals
                            </Text>
                            <PieChart
                                size={160}

                                withTooltip
                                data={[
                                    {
                                        name: "Completed",
                                        value: dashboardData?.["goalsCompleted"] ?? 20,
                                        color: "green"
                                    },
                                    {
                                        name: "In Progress",
                                        value: dashboardData?.["goalsInProgress"] ?? 20,
                                        color: "yellow"
                                    },
                                    {name: "Failed", value: dashboardData?.["goalsFailed"] ?? 20, color: "red"}
                                ]}
                            />
                        </Flex>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"

                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Steps Progress
                            </Text>
                            <RingProgress
                                size={140}
                                thickness={20}
                                roundCaps
                                sections={[
                                    {
                                        value: progressSteps,
                                        color: isGoalReachedSteps ? 'green' : 'blue',
                                    },
                                ]}
                                label={
                                    isGoalReachedSteps ? (
                                        <Center>
                                            <IconCheck size={30} stroke={2} color="green"/>
                                        </Center>
                                    ) : (
                                        <Text fw={700} fz="lg" ta="center">
                                            {Math.round(progressSteps)}%
                                        </Text>
                                    )
                                }
                            />

                            <Text ta="center">
                                {dashboardData?.["stepsCompleted"] ?? 0} / {dashboardData?.["stepsGoal"] ?? 6000} steps
                            </Text>
                        </Flex>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"

                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Burned Calories
                            </Text>
                            <RingProgress
                                size={140}
                                thickness={20}
                                roundCaps
                                sections={[
                                    {
                                        value: progressBurnedCalories,
                                        color: isGoalReachedBurnedCalories ? 'green' : 'red',
                                    },
                                ]}
                                label={
                                    isGoalReachedBurnedCalories ? (
                                        <Center>
                                            <IconCheck size={30} stroke={2} color="green"/>
                                        </Center>
                                    ) : (
                                        <Text fw={700} fz="lg" ta="center">
                                            {Math.round(progressBurnedCalories)}%
                                        </Text>
                                    )
                                }
                            />

                            <Text ta="center">
                                {dashboardData?.["burnedCalories"] ?? 0} / {dashboardData?.["burnedCaloriesGoal"] ?? 6000} calories
                            </Text>
                        </Flex>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"

                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Calories Intake
                            </Text>
                            <RingProgress
                                size={140}
                                thickness={20}
                                roundCaps
                                sections={[
                                    {
                                        value: progressCaloriesIntake,
                                        color: isGoalCaloriesIntake ? 'green' : 'yellow',
                                    },
                                ]}
                                label={
                                    isGoalCaloriesIntake ? (
                                        <Center>
                                            <IconCheck size={30} stroke={2} color="green"/>
                                        </Center>
                                    ) : (
                                        <Text fw={700} fz="lg" ta="center">
                                            {Math.round(progressCaloriesIntake)}%
                                        </Text>
                                    )
                                }
                            />

                            <Text ta="center">
                                {dashboardData?.["caloriesIntake"] ?? 0} / {dashboardData?.["caloriesIntakeGoal"] ?? 6000} calories
                            </Text>
                        </Flex>
                    </Card>
                    <Card
                        shadow="sm"
                        padding="md"
                        radius="md"
                        withBorder
                        className="transition-all duration-500 hover:shadow-lg"
                    >
                        <Flex direction="column" align="center" justify="center" gap="md">
                            <Text fw={600} size="lg" mb="sm">
                                Water Intake
                            </Text>

                            <RingProgress
                                size={140}
                                thickness={20}
                                roundCaps
                                sections={[
                                    {
                                        value: progressWater,
                                        color: isGoalMet ? 'teal' : 'blue',
                                    },
                                ]}
                                label={
                                    isGoalMet ? (
                                        <Center>
                                            <IconCheck size={30} stroke={2} color="teal" />
                                        </Center>
                                    ) : (
                                        <Text fw={700} fz="lg" ta="center">
                                            {Math.round(progressWater)}%
                                        </Text>
                                    )
                                }
                            />

                            <Text ta="center">
                                {dashboardData?.["waterIntake"] ?? 0}L / {WATER_GOAL ?? 4}L
                            </Text>
                        </Flex>
                    </Card>

                </SimpleGrid>
            </Card>
        </Container>
    )
}