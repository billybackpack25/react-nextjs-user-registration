import { NextApiRequest, NextApiResponse } from "next";

interface FormData {
    name: string;
    email: string;
    password: string;
    terms: boolean;
    token: string;
}

// Receieve form and submit a responce
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const formData: FormData = req.body;

    const errors = await validateData(formData);
    // If erros, throw error
    if (errors.length > 0) {
        res.status(400);
        res.json({errors});
        return;
    }

    // Otherwise Respond with OK
    res.status(201);
    res.json({message: "Success!"});
};

// Validate the data
async function validateData(formData: FormData): Promise<Array<string>> {
    const errors = [];
    const emails = ["used@amil.com"]; // Check if user already exists

    if (emails.includes(formData.email)) {
        errors.push("Email already used");
    }
    return errors;
} 

