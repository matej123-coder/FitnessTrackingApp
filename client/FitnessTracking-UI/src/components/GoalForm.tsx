import {
    Button,
    Card,
    Container,
    Flex,
    Group,
    LoadingOverlay,
    NumberInput,
    Radio,
    Text,
    TextInput,
    Title
} from "@mantine/core";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {hasLength, isNotEmpty, useForm} from "@mantine/form";
import {AxiosError} from "axios";
import {notifications} from "@mantine/notifications";
import {GoalService} from "../lib/services/goalService.ts";
import {DateInput} from "@mantine/dates";
import {ArrowRight} from "lucide-react";
export const GoalForm = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const {state} = useLocation();
    const id: number | null = state?.id ?? null;
    const navigate = useNavigate();
    const form = useForm<GoalDto>({
            mode: 'uncontrolled',
            initialValues: {
                title: "",
                description: "",
                startDate: null,
                goal: "",
                goalStatus: "IN_PROGRESS",
                targetValue: 0,
                endDate: null,
            },
            validate: {
                title: hasLength({min: 3, max: 100}, "Title must be between 3 and 100 characters"),
                description: hasLength({min: 10, max: 500}, "Description must be between 10 and 500 characters"),
                targetValue: (value) => value && value > 0 ? null : "Target must be greater than 0",
                goal: (value) => (value ? null : 'Please select a goal'),
                startDate: isNotEmpty("Start Date can not be empty"),
                endDate: isNotEmpty("End Date can not be empty "),
            }
        }
    )
    useEffect(() => {
        if (id) {
            fetchGoal(id).catch((error) => {
                console.error(error)
            })
        }
        const timer = setTimeout(() => setShowForm(true), 500);
        return () => clearTimeout(timer);
    }, []);
    const fetchGoal = async (id: number) => {
        try {
            const res = await GoalService.getGoal(id);
            form.setValues({
                title: res?.title,
                goalStatus: res?.goalStatus,
                startDate: res ? new Date(res.startDate) : null,
                endDate: res ? new Date(res.endDate) : null,
                goal: res?.goal,
                targetValue: res?.targetValue,
                description: res?.description
            })
        } catch (error) {
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
    const handleSubmit = async (values: GoalDto) => {
        setLoading(true)
        try {
            if (id) {
                await GoalService.updateGoal(values, id);
                notifications.show({
                    title: "Goal has been updated",
                    message: "goal was updated successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/goals")
            } else {
                await GoalService.createGoal(values);
                notifications.show({
                    title: "Goal has been created",
                    message: "goal was created successfully",
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'green'
                })
                navigate("/goals")
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                notifications.show({
                    title: "Failed to create or update goal",
                    message: error?.response?.data?.error,
                    autoClose: 5000,
                    position: 'top-right',
                    color: 'red'
                })
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container size='lg' py="xl">
            <Flex mb="lg" align="center" direction="column" justify="center">
                <Title order={1}
                       className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                    {id ? "Edit a goal" : "Add a goal"}
                </Title>
                <Text c="gray.3" size="lg" mt="md">
                    Please enter your goal below in the form
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
                    Enter your goal
                </Title>
                <form className="space-y-4" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                    <TextInput
                        label="Title"
                        key={form.key('title')}
                        placeholder="Enter your goal title..."
                        {...form.getInputProps("title")}
                    />
                    <TextInput
                        label="Description"
                        key={form.key('description')}
                        placeholder="Enter your goal description..."
                        {...form.getInputProps("description")}
                    />
                    <Radio.Group
                        label="Goal"
                        key={form.key("goal")}
                        {...form.getInputProps("goal")}
                    >
                        <Group mt="xs">
                            <Radio value="STEPS" label="Steps"/>
                            <Radio value="BURNED_CALORIES" label="Burned Calories"/>
                            <Radio value="CALORIES_INTAKE" label="Calories Intake"/>
                        </Group>
                    </Radio.Group>
                    <NumberInput
                        label="Target"
                        key={form.key('targetValue')}
                        placeholder="Enter your target value"
                        {...form.getInputProps("targetValue")}
                    />
                    <DateInput
                        clearable
                        label="Start date"
                        minDate={new Date()}
                        placeholder="Enter when you have started this goal"
                        key={form.key('startDate')}
                        {...form.getInputProps("startDate")}
                    />
                    <DateInput
                        clearable
                        minDate={new Date()}
                        label="End Date"
                        placeholder="Enter when you have ended this goal"
                        key={form.key('endDate')}
                        {...form.getInputProps("endDate")}
                    />
                    {id && <Radio.Group
                        label="Status"
                        key={form.key("goalStatus")}
                        {...form.getInputProps("goalStatus")}
                    >
                        <Group mt="xs">
                            <Radio value="IN_PROGRESS" label="In Progress"/>
                            <Radio value="COMPLETED" label="Completed"/>
                            <Radio value="FAILED" label="Failed"/>
                        </Group>
                    </Radio.Group>}
                    <Button
                        type="submit"
                        fullWidth
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <span>{id ? "Edit a goal" : "Add a goal"}</span>
                            <ArrowRight size={16}/>
                        </div>
                    </Button>
                </form>
            </Card>
        </Container>
    )
}