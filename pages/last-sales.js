import { useEffect, useState } from "react";
import useSWR from "swr";

// commented out code is using classic useEffect and fetch. other code is using useSWR

function LastSalesPage(props) {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(
        "https://nextjs-course-8010d-default-rtdb.firebaseio.com/sales.json",
        (url) => fetch(url).then((res) => res.json())
    );

    useEffect(() => {
        if (data) {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(
    //         'https://nextjs-course-8010d-default-rtdb.firebaseio.com/sales.json'
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const transformedSales = [];

    //             for (const key in data) {
    //                 transformedSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }
    //             setSales(transformedSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    // if (isLoading) {
    //     return <p>Loading...</p>;
    // }

    if (error) {
        return <p>Failed to load.</p>;
    }

    if (!data && !sales) {
        return <p>Loading...</p>;
    }

    // if (!sales) {
    //     return <p>No data yet</p>;
    // }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - $ {sale.volume}
                </li>
            ))}
        </ul>
    );
}

//pregenerates during the build process and revalidates after deployment with revalidate key ( the number after revalidate indicates seconds)
export async function getStaticProps() {
    return fetch("https://nextjs-course-8010d-default-rtdb.firebaseio.com/sales.json")
        .then((response) => response.json())
        .then((data) => {
            const transformedSales = [];

            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }

            return { props: { sales: transformedSales }, revalidate: 10 };
        });
}

export default LastSalesPage;
