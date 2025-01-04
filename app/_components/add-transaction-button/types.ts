import { z } from "zod"

import { formSchema } from "./schema"

export type FormSchema = z.infer<typeof formSchema>
