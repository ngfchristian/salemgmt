

export class UserModel  {
    constructor(
        public id: number, // id of the user
        public firstname: string, //
        public lastname: string,
        public email: string, // user email to serve as login
        public password: string,
        public tel: number,
        public country: string,
        public town: string,
        public area: string,
        // this token variable is used to hold/store the JWT that is returned from the api on successful authentification
        public token: string,
        // public courseslist: Array<CourseModel>
    ) {}
    }
