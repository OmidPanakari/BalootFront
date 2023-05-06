import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

function NotFound() {
    return (
        <>
            <Navbar/>
            <main>
                <div className="container p-5">
                    <h1 className="error">
                        Error Code 404
                    </h1>
                    <p className="error-text">Page Not Found</p>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default NotFound;