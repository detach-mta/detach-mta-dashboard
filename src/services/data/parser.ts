import { LogMetric, LogMail, LogMailMonthly } from "@/types/data";
import { dateFormat, referenceDate } from "@/utils/constants";
import { round, fromOToMo } from "@/utils/parser";
import { ChartData } from "chart.js";
import { parseISO, format, parse } from "date-fns";

export const getSavedMoSize = function (data: LogMetric) {
  let diff = data.totalInbound - data.totalOutbound;
  diff = diff > 0 ? diff : 0;
  return round(fromOToMo(diff), 2);
};

export const parseDataMonthly = function (mails: LogMail[]): LogMailMonthly[] {
  let mailsMonthly: LogMailMonthly[] = [];
  mails.forEach((mail: LogMail) => {
    const date = parseISO(mail.date);
    const month = format(date, dateFormat);
    const index = mailsMonthly.findIndex((mail) => mail.month === month);
    if (index !== -1) {
      mailsMonthly[index].totalInbound += mail.inboundSize;
      mailsMonthly[index].totalOutbound += mail.outboundSize;
    } else {
      mailsMonthly.push({
        month: month,
        totalInbound: mail.inboundSize,
        totalOutbound: mail.outboundSize,
      });
    }
  });
  return mailsMonthly;
};

export const parseDataGraph = function (data: LogMailMonthly[]): ChartData {
  const colorDetach = "#02AFCF";
  const colorAttach = "#000000";
  const borderWidth = 1.5;
  const alpha = "80";

  const chartData = {
    labels: data?.map((row: LogMailMonthly) =>
      parse(row.month, dateFormat, referenceDate)
    ),
    datasets: [
      {
        label: "Attached",
        data: data?.map((row: LogMailMonthly) => fromOToMo(row.totalInbound)),
        borderWidth,
        borderColor: colorAttach,
        backgroundColor: colorAttach + alpha,
      },
      {
        label: "Detattached",
        data: data?.map((row: LogMailMonthly) => fromOToMo(row.totalOutbound)),
        borderWidth,
        borderColor: colorDetach,
        backgroundColor: colorDetach + alpha,
      },
    ],
  };
  return chartData;
};
