import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

function Error() {
    return (
        <>
            <Navbar/>
            <main>
                <div className="container p-5">
                    <h1 className="error">
                        Error Code 500
                    </h1>
                    <p className="error-text">Something went wrong!</p>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Error;