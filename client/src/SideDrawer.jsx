export default function SideDrawer({ children }) {
    return (
        <aside className="fixed top-0 left-0 bg-gray-900 h-full w-64 z-50">
            <nav className="flex flex-col">
            {children}
            </nav>
        </aside>
    );
}