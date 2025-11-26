import { IconContext } from "react-icons";
import { SiInstagram } from "react-icons/si";
import { GoMail } from "react-icons/go"
import { FaLinkedinIn } from "react-icons/fa"
import { draftMode } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

import ModelViewer from "@/components/about/ModelViewer";

import { fetchEntries } from "@/lib/contentful";

export default async function AboutPage() {

    // Detect draft mode
    const { isEnabled: preview } = draftMode();

    // Disable all caching in preview mode
    if (preview) {
        noStore();
    }

    // Fetch About entry (preview aware)
    const aboutEntries = await fetchEntries("aboutPage", preview);
    const aboutPage = aboutEntries?.[0];

    const { introHeading, textBox, instagramUrl, email, linkedInUrl } = aboutPage.fields;
    const resumePdfUrl = "https:" + aboutPage.fields.resumePdf.fields.file.url

    return (
        <div className="container">
            <div className="row mx-md-5">
                <div className="col-12 col-md-6" style={{ paddingRight: "5rem" }}>
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
                    {/* <ModelViewer /> */}
                </div>
            </div>
        </div>
    )
}