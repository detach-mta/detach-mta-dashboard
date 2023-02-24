import { EquivToCO2, EquivList, LogMetric, LogMail } from "@/types/data";

const API = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000";
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

const dateFormat = "yyyy-MM";
const referenceDate = new Date();

const impactByMo = {
  co2_g: equivMo[0].impactByMo, // for 10Mo = 10,41+0.36
  cigarette: equivMo[1].impactByMo,
  bottle: equivMo[2].impactByMo,
  car: equivMo[3].impactByMo,
};

const DEFAULT_EQUIV_LIST: EquivList = {
  co2_g: 0,
  cigarette: 0,
  bottle: 0,
  car: 0,
};

const DEFAULT_METRIC: LogMetric = {
  totalInbound: 0,
  totalOutbound: 0,
  totalCount: 0,
  totalAttachments: 0,
};

const DEFAULT_MAIL: LogMail = {
  date: referenceDate.toISOString(),
  inboundSize: 0,
  outboundSize: 0,
  recipientsCount: 0,
  sender: "",
  hasAttachments: false,
};

export {
  dateFormat,
  equivMo,
  impactByMo,
  referenceDate,
  API,
  CLIENT,
  DEFAULT_METRIC,
  DEFAULT_EQUIV_LIST,
  DEFAULT_MAIL,
};
