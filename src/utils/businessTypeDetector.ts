
/**
 * Detects the business type based on common keywords in the business name
 * @param businessName - The name of the business
 * @returns The detected business type
 */
export const detectBusinessType = (businessName: string): string => {
  const name = businessName.toLowerCase();
  if (name.includes("pizz") || name.includes("trattoria") || name.includes("ristorant") || 
      name.includes("osteria") || name.includes("cucina") || name.includes("sapori")) {
    return "restaurant";
  } else if (name.includes("caffè") || name.includes("caffe") || name.includes("espresso") || 
            name.includes("bar") || name.includes("coffee")) {
    return "coffee_shop";
  } else if (name.includes("negozi") || name.includes("boutique") || name.includes("store") || 
            name.includes("shop")) {
    return "retail";
  } else if (name.includes("tech") || name.includes("software") || name.includes("digital") || 
            name.includes("app")) {
    return "tech";
  } else if (name.includes("fitness") || name.includes("gym") || name.includes("palestra")) {
    return "fitness";
  } else {
    // Default to retail if we can't determine
    return "retail";
  }
};
