'use client'

import { useRouter } from 'next/navigation'

import { Button, Input, Textarea } from '../ui'
import { z } from 'zod'
import { useModals } from '~/hooks/useModals'
import { useToast } from '~/hooks/useToast'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'

const createPlaceSchema = z.object({
    name: z.string().min(3).max(20),
    description: z.string().min(5).max(300).optional()
})
type CreatePlaceSchema = z.infer<typeof createPlaceSchema>

export default function CreatePlaceModal() {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const createPlaceMutation = api.place.create.useMutation()

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useZodForm({
        schema: createPlaceSchema
    })

    const handleCreatePlace = (data: CreatePlaceSchema) => {
        createPlaceMutation.mutate(
            {
                name: data.name,
                description: data.description
            },
            {
                onError: (err) => {
                    toast({
                        title: 'Error',
                        description: err.message,
                        variant: 'destructive'
                    })
                },
                onSuccess: () => {
                    router.refresh()
                    closeAllModals()
                }
            }
        )
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreatePlace)}>
            <Input
                label="Name"
                type="text"
                required
                error={errors.name?.message}
                {...register('name')}
            />

            <Textarea
                className="max-h-40"
                label="Description"
                error={errors.description?.message}
                {...register('description')}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
                <Button type="button" variant="outline" onClick={closeAllModals}>
                    Cancel
                </Button>

                <Button type="submit" loading={createPlaceMutation.isLoading}>
                    Create
                </Button>
            </div>
        </form>
    )
}
