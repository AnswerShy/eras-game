import { useEffect, useState } from "react"

interface data {
    name: string;
    item: string;
    pic: string,
    slug: string,
}

export default function Admin() {
    const [data, setData] = useState<data[]>([])

    useEffect(() => {
        fetch("/era.json")
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const show = () => {


        const elements = data.map((element, index) => (
            <>
                <a style={{width: '500px'}}>ERA - {element.name}</a>
                <div style={{ backgroundImage: `url(${data[index].pic ? data[index].pic : "/vite.svg"})`, width: '150px', height: '150px', backgroundPosition: '50% 50%', backgroundSize: 'cover'}}></div>
                <a style={{width: '500px'}}>item - {element.item}</a>
            </>
        )) 
        
        return elements
    }

    return (
        <div style={{width: '500px', display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center'}}>
            {data ? show() : null}
        </div>
    )
}