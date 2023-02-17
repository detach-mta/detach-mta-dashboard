type EquivToCO2 = {
  name: string;
  nameByMo: string;
  href: string;
  impactByMo: number;
};

type LogMail = {
  date: string;
  inboundSize: number;
  outboundSize: number;
  recipientsCount: number;
  sender: string;
  hasAttachments: boolean;
};

export type { EquivToCO2, LogMail };
