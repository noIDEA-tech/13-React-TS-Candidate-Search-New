// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    login: string;
    name: string | null;
    location: string | null;
    avatar_url: string;
    email: string | null;
    html_url: string | null;
    company: string | null;
    id: number;
    bio: string | null;
}
