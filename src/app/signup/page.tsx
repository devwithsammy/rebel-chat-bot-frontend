import { Metadata } from 'next'
import { defaultMeta } from '@src/shared/meta'
import { AuthTemplate } from '@src/ui/templates/AuthTemplate'

export const metadata:Metadata = { 
    ...defaultMeta, 
    title : `Join RebelAI`,
    description : 'Create an account with RebelAI'
}
export default function Page() { 
    return <AuthTemplate />
}