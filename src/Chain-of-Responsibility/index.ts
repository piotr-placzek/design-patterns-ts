/** https://refactoring.guru/pl/design-patterns/chain-of-responsibility */

export interface ChainLink {
    validate(user: User): Promise<User>;
}

export class User {
    constructor(
        public readonly login: string,
        public readonly pass: string,
        public readonly permmission: number
    ) {}
}

export class Authenticate implements ChainLink{
    validate(user: User): Promise<User> {
        if(
            user.login === "admin" &&
            user.pass === "admin"
        ) {
            return Promise.resolve(user);
        }
        return Promise.reject({
            m: "unauthenticated",
            u: user
        });
    }

}

export class Authorize implements ChainLink{
    validate(user: User): Promise<User> {
        if(
            user.permmission === 5
        ) {
            return Promise.resolve(user);
        }
        return Promise.reject({
            m: "unathorized",
            u: user
        });
    }

}

/** USAGE */
export function main(): void {
    function login(user): void {
        const authenticate: Authenticate = new Authenticate();
        const authorize: Authorize = new Authorize();
        authenticate.validate(user)
        .then(authorize.validate)
        .then(
            (u: User) => console.log("logged in", u)
        )
        .catch(
            (e: any) => console.log(e.m, e.u)
        );
    }

    
    const valid_user: User = new User("admin", "admin", 5);
    login(valid_user);

    const invalid_user_1: User = new User("admin", "", 5);
    login(invalid_user_1);

    
    const invalid_user_2: User = new User("admin", "admin", 8);
    login(invalid_user_2);
    
}