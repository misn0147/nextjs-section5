import path from "path";
import fs from "fs/promises";

import Link from 'next/link';

function HomePage(props) {
    const { products } = props;

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
            ))}
        </ul>
    );
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if (!data) {
      // if something goes wrong with fetching the data
      return {
        redirect: {
          // '/no-data' would be a page that we don't have set up in the program but that you could have it redirect to
          destination: '/no-data'
        }
      };
    }

    if (data.products.length === 0) {
      //renders a 404 page if the fetch works but there is no data
        return { notFound: true };
    }

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}

export default HomePage;
