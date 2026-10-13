import ListCard from "./ListCard";

export default function HomeLists() {

    const lists = [
        { name: "Shopping List", items: 5 },
        { name: "To-Do List", items: 3 },
    ];

    const renderLists = () => {
        return lists.map((listInfo, i) => <ListCard key={i} listInfo={listInfo} /> )
    }

    return (
        <div className="w-full flex flex-row">
            
        </div>
    )
}