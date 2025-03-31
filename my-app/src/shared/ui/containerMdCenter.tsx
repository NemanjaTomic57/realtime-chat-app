export default function ContainerSmCenter({children}: {children: React.ReactNode}) {
    return (
        <div className="fixed w-[440px] inset-0 m-auto h-fit bg-primary-light-shade rounded-lg p-4">
            {children}
        </div>
    )
}