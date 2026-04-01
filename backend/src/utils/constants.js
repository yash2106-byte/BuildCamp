// this is the place from where our we'll keep all the important variables so that we dont do any typos

export const UserRolesEnum = {
    ADMIN: "admin",
    PROJECT_ADMIN: "project_admin",
    MEMBER: "member"
}
// this is will give all the above details in an array so that we can iterate and get value
export const AvailableUserRole = Object.values(UserRolesEnum)

export const TaskStatusEnum = {
    TODO: "todo",
    IN_PROGRESS: "in_progress",
    DONE: "done"
}
export const AvailableTaskStatus = Object.values(TaskStatusEnum)