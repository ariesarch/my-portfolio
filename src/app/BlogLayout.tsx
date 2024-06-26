import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import "./styles/normalize.css"; // Reset browser defaults
// import "./styles/tokens.css"; // Includes CSS variables
import "./styles/prism.css"; // Syntax highlight
// import Navbar from '@/components/common/Navbar'
import "./styles/globals.css"
import GroupSidebar from '@/components/molecules/GroupSidebar';
import { BlogContainer } from '@/components/BlogContainer';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Note Layout',
    description: 'Generated by create next app',
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <BlogContainer className='mx-auto note-layout lg:grid-cols-5 lg:gap-2 lg:py-16'>
            {/* <div > */}
                <GroupSidebar />
                <div className="col-span-4">{children}</div>
            {/* </div> */}
        </BlogContainer>
    )
}
