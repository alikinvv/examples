export interface ServerProps {
    tab: string
    tabCode: string
    step: string
    stepCode: string
    url: string
    interfaceUrl: string
    pageInterfaceUrl: string
}

export interface ServerParamsProps {
    tab?: string
    step?: string
    url?: string
}

export interface GetStateProps {
    (param?: ServerParamsProps): ServerProps
}
