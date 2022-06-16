import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        name: string({
            required_error:"Name is Requied"
        }),
        
        password: string({
            required_error:"Password is Requied"
        }).min(6, "Password too short - should be 6 chars or more"),
        
        passwordConfirmation: string({
            required_error:"Name is Requied"
        }).min(6, "passwordConfirmation too short - should be 6 chars or more"),
        
        email: string({
            required_error:"Email is Requied"
        }).email("Not a valid email"),
    })
    .refine(data => data.password === data.passwordConfirmation, 
        {
            message: "Password do not match",
            path:["passwordConfirmation"]
        }
    )
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">