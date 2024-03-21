export const Container = ({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className?: string
}>)=>{
    return (
        <div className={`container-fluid xl:h-screen bg-primary/30 xl:ml-24 py-20 2xs:py-28 px-4 ${className} overflow-auto h-full`}>
            {children}
        </div>
    )
}