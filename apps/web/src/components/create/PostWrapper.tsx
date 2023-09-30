'use client'

import { useState } from 'react'

import { RouterOutputs } from '@snacr/api'
import { Place } from '@snacr/db'
import { cn } from '@snacr/ui-utils'
import {
    Button,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@snacr/ui-web'

import CreateTextPost from './TextPost'
import { CaretUpDown, Check, Icon, ImageSquare, Link, Note } from '@phosphor-icons/react'

const tabs: TabButtonProps[] = [
    {
        title: 'Text',
        Icon: Note
    },
    {
        title: 'Media',
        Icon: ImageSquare
    },
    {
        title: 'Link',
        Icon: Link
    }
]

interface Props {
    subscriptions: RouterOutputs['subscriptions']['places']
}

export default function CreatePostWrapper({ subscriptions }: Props) {
    const [tabIndex, setTabIndex] = useState(0)
    const [selectOpen, setSelectOpen] = useState(false)
    const [selectedPlace, setPlace] = useState<Place>()

    return (
        <div className="flex flex-col w-full">
            <Popover open={selectOpen} onOpenChange={setSelectOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-80 mb-4 justify-between">
                        {selectedPlace
                            ? subscriptions.find(
                                  (subscription) => subscription.place.name === selectedPlace.name
                              )?.place.name
                            : 'Choose place'}
                        <CaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0">
                    <Command>
                        <CommandInput placeholder="Search place" />
                        <CommandEmpty>No places found.</CommandEmpty>
                        <CommandGroup>
                            {subscriptions.map((subscription) => (
                                <CommandItem
                                    key={subscription.place.id}
                                    onSelect={() => {
                                        setPlace(subscription.place)
                                        setSelectOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            selectedPlace?.name === subscription.place.name
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {subscription.place.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex flex-col bg-secondary rounded-xl">
                <div className="grid grid-cols-3 w-full">
                    {tabs.map((tab, i) => (
                        <TabButton
                            title={tab.title}
                            Icon={tab.Icon}
                            selected={tabIndex === i}
                            onClick={() => setTabIndex(i)}
                            key={tab.title}
                        />
                    ))}
                </div>

                <div className="p-6">
                    {tabIndex === 0 ? <CreateTextPost place={selectedPlace} /> : <></>}
                </div>
            </div>
        </div>
    )
}

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: Icon
    title: string
    selected?: boolean
}

function TabButton({ Icon, title, selected, ...props }: TabButtonProps) {
    return (
        <button
            className={cn(
                'flex justify-center items-center gap-1 py-3 text-muted-foreground text-lg border-b-2 border-r [&:nth-child(3)]:border-r-0',
                selected && 'text-foreground border-b-primary'
            )}
            {...props}
        >
            <Icon weight={selected ? 'bold' : 'light'} size={24} />

            {title}
        </button>
    )
}
