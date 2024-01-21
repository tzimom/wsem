export default interface User {
    username: string;
    firstname: string;
    lastname: string;
    classname: string;
}

export function userFromRow(row: any): User {
    return {
        username: row.username,
        firstname: row.firstname,
        lastname: row.lastname,
        classname: row.class,
    };
}
