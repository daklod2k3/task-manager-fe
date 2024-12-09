"use client"

export default function NavPermission() {
  const handleSwitch = (name: string) => {
    const query = new URLSearchParams(window.location.search);
    query.set("cate", name);
    const newUrl = `${window.location.pathname}?${query.toString()}`;
    window.history.pushState(null, "", newUrl);
  };
  return (
    <div className="w-64 border-r p-4 space-y-4">
      <div className="font-medium">Category</div>
      <nav className="space-y-2">
        {["Role", "User", "Resoucre"].map(
          (item) => (
            <div
              key={item}
              className="px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-md cursor-pointer"
              onClick={() => {handleSwitch(item)}}
              >
              {item + " Management"}
            </div>
          )
        )}
      </nav>
    </div>
  )
}