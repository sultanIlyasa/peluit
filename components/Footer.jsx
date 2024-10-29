export default function Footer({
}){
    return (
        <footer style={{color: "#000"}} className="mt-10">
            <div className=" row justify-content-center p-4 g-2 m-0 w-100" style={{height: "80%"}}>
                <div className="col-12 col-md-4 text-center">
                    <h3>PELUIT 2023</h3>
                    <h5 className="mb-3">Stay in touch</h5>
                    <div className="sosmed mx-auto d-flex justify-content-evenly">
                        <a href="https://www.instagram.com/peluithimatif/" target="_blank">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="logo-footer d-flex justify-content-center align-items-center" style={{height: "100%", width: "100%"}}>
                        <img src="img/pencerdasan kpu 2021-04 1.png" alt="" style={{height: "120px", width: "auto"}}/>
                    </div>
                </div>
                <div className="col-12 col-md-4 flex text-center">
                    <div class="footer-text-container">
                        <div className="mr-4">
                        Danish
                        <br />
                        LINE : courtois.12
                        <br />
                        WA : 081383851226
                        </div>
                        <div>
                        Adel
                        <br />
                        LINE : adeliafelisha
                        <br />
                        WA : 0811994437
                        </div>
                    </div>
                </div>
            </div>
            <div className="row container-fluid text-center m-0 w-100">
                <div className="col" style={{height:"20%"}}>
                    <p>©2023. PELUIT Himatif. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}