import React, { useState, useEffect } from 'react';
// import './NewsFetch.scss';
import '../../SideMenu/SideMenu.scss';
import { Link } from 'react-router-dom';

export default function OtherFetch(props) {
    const [apiData, setApiData] = useState(null);

    async function getCategory() {
        const fetchHeaders = new Headers();
        fetchHeaders.append('Accept', 'application/json');
        try {
            const request = await fetch('https://api.mediehuset.net/stringsonline/productgroups', { headers: fetchHeaders });
            const response = await request.json();
            // console.log(response.items[0].subgroups);
            // console.log('guitar subgroup');
            setApiData(response.items[2].subgroups);
        } catch (error) {
            console.log('getCategory -> Error', error);
        }
    }


    useEffect(() => {
        getCategory()
    }, [])

    // Return mapper igennem subgroups i productgroups array, kreerer links ud fra disse, der fører til de specifikke elementers ID (fetcher deres info ud fra deres ID)

    return (

        <div>
                {
                    apiData && apiData.length > 0 && apiData.map((item, i) =>
                        <section className="extra-push" key={item.id}>
                            <Link to={`/guitarpage/${item.id}`}>
                                <ul><li>{item.title}</li></ul>
                            </Link>
                        </section>
                    )
                }
        </div>

    )
}