import UserItems from "./UserItems";

export default function UserList({ items }) {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen py-8 px-4">
        <div className="w-full max-w-2xl">
            {items?.length ? (
                <div className="grid grid-cols-1 gap-4">
                    {items.map((user) => (
                        <UserItems
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            place={user.places.length}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-gray-600 text-center mt-4">No users found</div>
            )}
        </div>
    </div>
    );
  }