export const UserState = {
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
} as const;

export type UserState = (typeof UserState)[keyof typeof UserState];