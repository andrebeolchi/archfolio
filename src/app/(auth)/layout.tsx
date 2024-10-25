export default async function GeneralLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full space-y-6 flex flex-col flex-1">{children}</div>
}
