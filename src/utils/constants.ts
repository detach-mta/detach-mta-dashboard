import { EquivToCO2 } from "@/types/data";

const API = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000";
const USER = process.env.NEXT_PUBLIC_USER || "naedri@mail.com";
const CLIENT = process.env.NEXT_PUBLIC_FRONTEND || "http://localhost:3000";

const equivMo: EquivToCO2[] = [
  {
    name: "CO₂ g",
    nameByMo: "CO₂ g",
    href: "https://impactco2.fr/usagenumerique/email",
    impactByMo: 4.136, // for 10Mo = 10,41+0.36
  },
  {
    name: "Cigarette",
    nameByMo: "cigarette",
    href: "https://impactco2.fr/divers/cigarette",
    impactByMo: 0.295430344,
  },
  {
    name: "Bottle",
    nameByMo: "liter of water bottle",
    href: "https://impactco2.fr/boisson/eauenbouteille",
    impactByMo: 0.009136424,
  },
  {
    name: "Km",
    nameByMo: "km with car",
    href: "https://impactco2.fr/divers/voiturethermique",
    impactByMo: 0.019009056,
  },
];

const impactByMo = {
  co2_g: equivMo[0].impactByMo, // for 10Mo = 10,41+0.36
  cigarette: equivMo[1].impactByMo,
  bottle: equivMo[2].impactByMo,
  car: equivMo[3].impactByMo,
};

const dateFormat = "yyyy-MM-dd";
const referenceDate = new Date();

export { dateFormat, equivMo, impactByMo, referenceDate, API, USER, CLIENT };
