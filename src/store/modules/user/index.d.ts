// 整个state
export interface UserState {
    user: User;
}
// state中的user
export interface User {
    avatar: string;
    name: string;
    id: string | number;
    uuid: string;
    token: string;
}
