export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MediStore",
    "description": "Your trusted online pharmacy for authentic medicines, fast delivery, and expert healthcare advice.",
    "url": "https://medistore.com",
    "logo": "https://medistore.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": "English",
      "areaServed": "US"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Health Street",
      "addressLocality": "Medical City",
      "addressRegion": "MC",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://facebook.com/medistore",
      "https://twitter.com/medistore",
      "https://instagram.com/medistore"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medicine Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Prescription Medicines",
            "category": "Healthcare"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Over-the-Counter Medicines",
            "category": "Healthcare"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}