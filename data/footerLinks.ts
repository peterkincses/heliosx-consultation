type FooterLink = {
    text: string;
    url: string;
    group: string;
}

const footerLinks: FooterLink[] = [
    {
        text: "Home",
        url: "/",
        group: "column-1"
    },
    {
        text: "About Us",
        url: "/about",
        group: "column-1"
    },
    {
        text: "Services",
        url: "/services",
        group: "column-1"
    },
    {
        text: "Contact",
        url: "/contact",
        group: "column-1"
    },
    {
        text: "Privacy Policy",
        url: "/privacy-policy",
        group: "column-1"
    },
    {
        text: "Terms of Service",
        url: "/terms-of-service",
        group: "column-1"
    },
    {
        text: "Consultation",
        url: "/healthcare/consultation",
        group: "column-2"
    },
    {
        text: "FAQs",
        url: "/faqs",
        group: "column-2"
    },
    {
        text: "Delivery",
        url: "/delivery",
        group: "column-2"
    },
    {
        text: "Complaints",
        url: "/complaints",
        group: "column-2"
    },
    {
        text: "Blog",
        url: "/blog",
        group: "column-2"
    },
    {
        text: "BMI Calculator",
        url: "/bmi-calculator",
        group: "column-2"
    }
];

export default footerLinks;