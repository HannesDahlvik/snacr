'use client'

import { PropsWithChildren, useState } from 'react'
import { createContext } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    type DialogProps
} from '../components/ui'
import { genRandomString } from '~/lib/utils'

export type ModalSettings = Partial<DialogProps> &
    Partial<{
        title: string
        description: string
        modalId: string
    }>

export type ModalsContextProps = {
    openModal: (props: ModalSettings) => void
    closeModal: (id: string) => void
    closeAll: () => void
} | null

export const ModalsContext = createContext<ModalsContextProps>(null)

export function ModalsProvider({ children }: PropsWithChildren) {
    const [modals, setModals] = useState<ModalSettings[]>([])

    const openModal = (props: ModalSettings) => {
        const id = props.modalId || genRandomString(20)
        const modal: ModalSettings = {
            ...props,
            modalId: id,
            open: true,
            onOpenChange: () => closeModal(id)
        }

        setModals([...modals, modal])
    }

    const closeModal = (id: string) => {
        const arr = [...modals]
        let closedModal = modals.findIndex((m) => m.modalId === id)
        arr.splice(closedModal, 1)
        setModals(arr)
    }

    const closeAll = () => {
        setModals([])
    }

    return (
        <ModalsContext.Provider value={{ closeAll, closeModal, openModal }}>
            {modals.map((modal) => (
                <Dialog open={modal.open} onOpenChange={modal.onOpenChange} key={modal.modalId}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{modal.title}</DialogTitle>
                            {modal.description && (
                                <DialogDescription>{modal.description}</DialogDescription>
                            )}
                        </DialogHeader>

                        {modal.children}
                    </DialogContent>
                </Dialog>
            ))}

            {children}
        </ModalsContext.Provider>
    )
}
