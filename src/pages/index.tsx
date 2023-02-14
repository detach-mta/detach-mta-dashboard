import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Graph from "@/component/Graph/Graph";
import "chartjs-adapter-date-fns";
import parse from "date-fns/parse";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const PERCENT_SAVE = 1.5;

const impactByMo = {
  co2_g: 4.136, // for 10Mo = 10,41+0.36
  cigarette: 0.295430344,
  bottle: 0.009136424,
  table: 0.000053768,
  car: 0.019009056,
};
type ImpactByMoType = typeof impactByMo;

function round(num: number, fractionDigits = 2): number {
  return Number(num.toFixed(fractionDigits));
}

const dateFormat = "yyyy-MM-dd";
const referenceDate = new Date();

const data = [
  { date: "2022-09-15", size: 10 },
  { date: "2022-10-15", size: 20 },
  { date: "2022-11-15", size: 15 },
  { date: "2022-12-15", size: 25 },
  { date: "2023-01-15", size: 22 },
  { date: "2023-02-15", size: 28 },
];

const getSavedMoSize = function (data: { date: string; size: number }[]) {
  const count = data.reduce(
    (prevValue, row) => prevValue + row.size * PERCENT_SAVE,
    0
  );
  return count;
};

const parseData = function (data: { date: string; size: number }[]) {
  const colorDetach = "#02AFCF";
  const colorAttach = "#000000";
  const borderWidth = 1.5;

  return {
    labels: data?.map((row: { date: string }) =>
      parse(row.date, dateFormat, referenceDate)
    ),
    datasets: [
      {
        label: "Attached",
        data: data?.map(
          (row: { size: number }) => row.size * (1 + PERCENT_SAVE)
        ),
        borderWidth,
        borderColor: colorAttach,
        backgroundColor: colorAttach + "80",
      },
      {
        label: "Detattached",
        data: data.map((row) => row.size),
        borderWidth,
        borderColor: colorDetach,
        backgroundColor: colorDetach + "80",
      },
    ],
  };
};

export default function Home() {
  const savedMoSize = getSavedMoSize(data);
  const savedMoSizeEqui: ImpactByMoType = {
    co2_g: savedMoSize * impactByMo.co2_g,
    cigarette: round(savedMoSize * impactByMo.cigarette),
    bottle: round(savedMoSize * impactByMo.bottle),
    table: round(savedMoSize * impactByMo.table),
    car: round(savedMoSize * impactByMo.car),
  };

  return (
    <>
      <Head>
        <title>Detach MTA - Dashboard</title>
        <meta name="viewport" content="width=device.width, initial-scale=1.0" />
        <meta name="description" content="To compare space saved" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Don&apos;t tach my documents</h1>
        </div>
        <div className={styles.description}>
          <p>SMTP optimized for file sharing</p>
          <div>
            <a
              href="https://www.imt.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/imt.svg"
                alt="IMT Logo"
                className={styles.imtLogo}
                width={70}
                height={30}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Graph data={parseData(data)}></Graph>
        </div>

        <div className={styles.center}>
          <div className={styles.logo}>
            <h2>You have saved :</h2>
          </div>
          <div className={styles.thirteen}>{savedMoSize + "Mo"}</div>
        </div>

        <div className={styles.description}>
          <h2>which is equivalent to :</h2>
        </div>

        <div className={styles.grid}>
          <a
            href="https://impactco2.fr/usagenumerique/email"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {round(savedMoSizeEqui.co2_g / 1000)} <span>kg</span>
              {` of CO₂`}
            </h2>
            <p className={inter.className}>
              {`${round(impactByMo.co2_g, 4)} g of CO₂ by Mo.`}
            </p>
          </a>

          <a
            href="https://impactco2.fr/divers/cigarette"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {savedMoSizeEqui.cigarette} <span>&#10799;</span>{" "}
              {`Cigarette${savedMoSizeEqui.cigarette >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>
              {`${round(impactByMo.cigarette, 4)} cigarette${
                impactByMo.cigarette >= 2 ? "s" : ""
              } by Mo.`}
            </p>
          </a>

          <a
            href="https://impactco2.fr/boisson/eauenbouteille"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {savedMoSizeEqui.bottle} <span>&#10799;</span>{" "}
              {`Bottle${savedMoSizeEqui.bottle >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>
              {`${round(impactByMo.bottle, 4)} liter${
                impactByMo.bottle >= 2 ? "s" : ""
              } of bottled water by Mo.`}
            </p>
          </a>
          <a
            href="https://impactco2.fr/transport/voiturethermique"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {savedMoSizeEqui.car} <span>&#10799;</span>{" "}
              {`Km${savedMoSizeEqui.car >= 2 ? "s" : ""} by car`}
            </h2>
            <p className={inter.className}>
              {`${round(impactByMo.car, 4)} kilometer${
                impactByMo.car >= 2 ? "s" : ""
              } by car by Mo.`}
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
