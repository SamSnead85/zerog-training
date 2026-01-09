import InvoiceGenerator from "@/components/admin/InvoiceGenerator";

export const metadata = {
    title: "Enterprise Invoices | ScaledNative Admin",
    description: "Generate and manage enterprise invoices with volume pricing",
};

export default function InvoicesPage() {
    return <InvoiceGenerator />;
}
