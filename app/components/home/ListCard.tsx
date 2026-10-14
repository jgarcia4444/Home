
interface ListInfo {
    name: string;
    items: number;
}

export default function ListCard({listInfo} : {listInfo: ListInfo}) {

    return (
        <div className="p-4 bg-green-700/30 rounded shadow-md">
            <h2 className="text-xl font-bold">{listInfo.name}</h2>
            <p className="text-gray-500">{listInfo.items} items</p>
        </div>
    )
}