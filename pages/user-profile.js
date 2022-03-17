function UserProfilePage(props) {
    return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// this only executes on the server after depoloyment but is not statically pregenerated
export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: 'Max'
        }
    };
}