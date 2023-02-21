export type EquivList = {
  co2_g: number;
  cigarette: number;
  bottle: number;
  car: number;
};

export type EquivToCO2 = {
  name: string;
  nameByMo: string;
  href: string;
  impactByMo: number;
};

export type LogMail = {
  date: string;
  inboundSize: number;
  outboundSize: number;
  recipientsCount: number;
  sender: string;
  hasAttachments: boolean;
};

export type LogMetric = {
  totalInbound: number;
  totalOutbound: number;
  totalCount: number;
  totalAttachments: number;
};

export type LogMailMonthly = {
  month: string;
  totalInbound: number;
  totalOutbound: number;
};
