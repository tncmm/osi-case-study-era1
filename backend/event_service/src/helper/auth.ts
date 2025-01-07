import axios from 'axios';
import { config } from '../config/config';

interface UserDetails {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export async function getUserDetails(userId: number): Promise<UserDetails | null> {
    try {
        const response = await axios.get(`${config.auth_service_url}/authentication/user/${userId}`);
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
} 