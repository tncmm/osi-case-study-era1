

export interface RegisterDTO {
    phoneNumber: string;
    password: string;
    name: string;
    surname: string;
    email: string;

}


export interface PhoneLoginDTO {
    phoneNumber: string;
    password: string;
}

export interface EmailLoginDTO {
    email: string;
    password: string;
}