
export const BlogContainer = ({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className?: string
}>) => {
    return (
        <div className={`container-fluid xl:h-screen xl:ml-24 py-20 2xs:py-32 px-4 ${className} overflow-auto h-full`}>
            {children}
        </div>
    )
}