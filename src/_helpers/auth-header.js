import { authenticationService } from '@/_services';

export function authHeader() {
    // возвращает jwt токен
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return { Authorization: `TK ${currentUser.token}` };
    } else {
        return {};
    }
}