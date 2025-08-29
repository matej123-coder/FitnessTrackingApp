interface RegisterUserDto {
    username: string,
    email: string,
    password: string,
    fullName: string,
    weight: number,
    height: number,
    goal: string,
    age: number,
    gender: string,
}

interface VerificationDto {
    email: string,
    verificationCode: string
}

interface RegisterResponse {
    estimatedCalorieIntake: number
}

interface LoginDto {
    email: string,
    password: string
}

interface LoginResponse {
    jwtToken: string,
    expiresIn: number
}

interface ResetPasswordDto {
    email: string
}

interface ChangedPasswordDto {
    newPassword: string,
    resetPasswordToken: string
}

interface MealResponse {
    id: number,
    name: string,
    caloriesIntake: number,
    mealDate: string,
    userId: number,
}

interface MealsResponsePage {
    content: Array<MealResponse>,
    pageNo: number,
    pageSize: number,
    totalElements: number,
    isLast: boolean,
    totalPages: number,
}

interface MealDto {
    name: string,
    caloriesIntake: number,
    mealDate: Date | null,
}

interface GoalResponsePage {
    content: Array<GoalResponse>,
    pageNo: number,
    pageSize: number,
    totalElements: number,
    isLast: boolean,
    totalPages: number,
}

interface GoalResponse {
    id: number;
    title: string;
    description: string;
    targetValue: number;
    goal: string;
    startDate: string;
    endDate: string;
    goalStatus: string;
    userId: string;
}

interface GoalDto {
    title: string;
    description: string;
    targetValue: number;
    goal: string;
    startDate: Date | null;
    endDate: Date | null;
    goalStatus: string
}


interface WorkoutSessionDto {
    name: string;
    description: string;
    burnedCalories: number;
    duration: string;
    workoutType: string;
    pace: number | null;
    distance: number | null;
    exercises: Array<ExerciseDto>
}

interface ExerciseDto {
    exerciseName: string;
    weight: number;
    numberOfSets: number;
    numberOfReps: number;
}

interface WorkoutResponse {
    id: number;
    name: string;
    description: string;
    burnedCalories: number;
    createdAt: string;
    duration: string;
    workoutType: string;
    pace: number | null;
    distance: number | null;
    exercises: Array<ExerciseDto>;
    userId: number;
}

interface WorkoutResponsePage {
    content: Array<WorkoutResponse>,
    pageNo: number,
    pageSize: number,
    totalElements: number,
    isLast: boolean,
    totalPages: number,
}

interface DailyTrackingDto {
    dailySteps: number;
    dailyWaterIntake: number;
}

interface DailyTrackingResponse {
    id: number;
    dailySteps: number;
    dailyWaterIntake: number;
    createdAt: number;
    userId: number;
}
interface DailyTrackingResponsePage{
    content: Array<DailyTrackingResponse>,
    pageNo: number,
    pageSize: number,
    totalElements: number,
    isLast: boolean,
    totalPages: number,
}
interface UserResponse{
    id:number;
    username: string,
    email: string,
    fullName: string,
    weight: number,
    height: number,
    goal: string,
    age: number,
    gender: string,
    role:string
}