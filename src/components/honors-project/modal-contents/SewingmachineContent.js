export default function SewingmachineContent() {
    
    const customStyles = {
        fontFamily: 'DM Sans, sans-serif', // Specify DM Sans as the font-family
    };
    

    return (
        <div style={customStyles}>
            <img className="w-100" src='img/honors-project/artifact-images/sewing-machine-collage.PNG' alt='A collage of various sewing and knitting projects' /> 
            <div className="px-md-5">
                <p className="py-2">My industrial sewing machine is my favorite free Facebook Marketplace find. I love having the ability to prototype and sew at a high fidelity at home. I’ve come a long way since I first learned how to use an industrial sewing machine in a soft goods design course. In the class, I learned sewing and bonding techniques, fundamentals in pattern making, and manufacturing processes for soft goods products. Over time, I’ve continued to learn more tools and techniques outside of the classroom such as using an embroidery machine and flat bed knitting machine. I’ve explored different materials such as leather, upcycled sailcloth, and more. </p>
                {/* Other content specific to SewingmachineContent */}
            </div>
        </div>
    )
}