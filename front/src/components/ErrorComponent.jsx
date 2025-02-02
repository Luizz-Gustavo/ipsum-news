function ErrorComponent({ error }) {
    return (
        <>
            <div className="container-titulo">
                <div>
                    <h1>Error!</h1>
                </div>
            </div>

            <div className="container-tabela">
                <div className="container">
                    <p className="mt-5 mb-5 text-xl text-center text-red-600">{error.message}</p>
                </div>
            </div>
        </>
    );
}
export default ErrorComponent;