export default function NavPermission({onSwitch}:{onSwitch: (name:string) => void}) {
  return (
    <div className="w-64 border-r p-4 space-y-4">
      <div className="font-medium">Category</div>
      <nav className="space-y-2">
        {["Role Management", "User Management", "Resoucre"].map(
          (item) => (
            <div
              key={item}
              className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer"
              onClick={() => {onSwitch(item)}}
              >
              {item}
            </div>
          )
        )}
      </nav>
    </div>
  )
}