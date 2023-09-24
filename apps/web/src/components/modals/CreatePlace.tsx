'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button, Input, Textarea } from '../ui'
import { z } from 'zod'
import { useModals } from '~/hooks/useModals'
import { useToast } from '~/hooks/useToast'
import { useZodForm } from '~/hooks/useZodForm'
import { api } from '~/lib/api'
import { createURL } from '~/lib/utils'

const createPlaceSchema = z.object({
    name: z.string().min(3).max(20),
    description: z.string().max(300).optional()
})
type CreatePlaceSchema = z.infer<typeof createPlaceSchema>

export default function CreatePlaceModal() {
    const { closeAllModals } = useModals()
    const { toast } = useToast()
    const router = useRouter()

    const [url, setUrl] = useState('p/')

    const createPlaceMutation = api.place.create.useMutation()

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors }
    } = useZodForm({
        schema: createPlaceSchema
    })

    useEffect(() => {
        const subscribe = watch((value, { name }) => {
            if (name === 'name') {
                setUrl(createURL(value.name ?? ''))
            }
        })
        return () => subscribe.unsubscribe()
    }, [watch])

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

            <Input
                className="h-8 text-muted-foreground"
                label="URL"
                type="text"
                value={url}
                readOnly
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
