import { IconContext } from "react-icons";
import { SiInstagram } from "react-icons/si";
import { GoMail } from "react-icons/go"
import { FaLinkedinIn } from "react-icons/fa"

import ModelViewer from "@/components/about/ModelViewer";

import { fetchEntries } from "@/lib/contentful";

export default async function AboutPage() {
    const aboutPage = await fetchEntries('aboutPage');

    const { introHeading, textBox, instagramUrl, email, linkedInUrl } = aboutPage[0].fields;
    const resumePdfUrl = "https:" + aboutPage[0].fields.resumePdf.fields.file.url

    return (
        <div className="container">
            <div className="row mx-md-5">
                <div className="col-12 col-md-6" style={{paddingRight: "5rem"}}>
                    <section>
                        <h1 className="mt-5 mb-4">{introHeading}</h1>
                        <p className="mb-5">{textBox}</p>
                    </section>
                    <section className="mt-5 mb-5" >
                        <a className="no-underline-link" href={resumePdfUrl}>VIEW RESUME</a>
                    </section>
                    <section>
                        <p className="fw-bold">SAY HI!</p>
                        {/* <a className="email-link fw-bold text-decoration-none" href="mailto:oomen@uw.edu">oomen@uw.edu</a> */}
                        <div className="d-flex flex-row mt-3">
                                <a className="text-dark" href={instagramUrl} aria-label="Instagram"><span className="me-3"><SiInstagram /></span></a>
                                <a className="text-dark" href={`mailto:${email}`} aria-label="Email"><span className="me-3"><GoMail /></span></a>
                                <a className="text-dark" href={linkedInUrl} aria-label="LinkedIn"><span className="me-3"><FaLinkedinIn /></span></a>
                        </div>
                    </section>                   
                </div>
                <div className="col-12 col-md-6">
                    <ModelViewer />
                </div>
            </div>
        </div> 
    )
}