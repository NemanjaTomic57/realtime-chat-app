interface User {
    userName: string;
    email: string;
    profilePictureUrl: "/profilePicturePlaceholder.png" | (string & {});
}

interface EmailToken {
    email: string,
    token: string,
}