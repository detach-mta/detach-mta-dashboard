import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Graph from "@/component/Graph/Graph";
import "chartjs-adapter-date-fns";
import { round } from "@/utils/parser";
import {
  impactByMo,
  DEFAULT_METRIC,
  DEFAULT_EQUIV_LIST,
  DEFAULT_MAIL,
} from "@/utils/constants";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EquivList, LogMail, LogMetric } from "@/types/data";
import { fetchMailLog, fetchMailStats } from "@/services/rest/mail";

import { Inter } from "@next/font/google";
import {
  getSavedMoSize,
  parseDataGraph,
  parseDataMonthly,
} from "@/services/data/parser";
const inter = Inter({ subsets: ["latin"] });

const logClassName = "index";

export default function Home() {
  const router = useRouter();
  const query = new URLSearchParams(router.asPath.split("?")[1]);
  const queryObject = Object.fromEntries(query.entries());
  const mail = queryObject?.mail;

  const [mails, setMails] = useState<LogMail[]>([]);
  const [metrics, setMetrics] = useState<LogMetric>(DEFAULT_METRIC);
  const [savedMo, setSavedMo] = useState(0);
  const [savedEqui, setSavedEqui] = useState<EquivList>(DEFAULT_EQUIV_LIST);
  const [user, setUser] = useState<string>(mail);

  const updateMail = async (userMail: string) => {
    let metrics: React.SetStateAction<LogMetric>;
    let mails: React.SetStateAction<LogMail[]>;
    if (userMail) {
      const res = (await fetchMailLog(userMail)).response;
      metrics = res.metrics;
      mails = res.mails;
    } else {
      const res = (await fetchMailStats()).response;
      metrics = res;
      mails = [
        {
          ...DEFAULT_MAIL,
          inboundSize: metrics.totalInbound,
          outboundSize: metrics.totalOutbound,
        },
      ];
    }
    setUser(userMail);
    setMails(mails);
    setMetrics(metrics);
    const savedSize = getSavedMoSize(metrics, 0);
    setSavedMo(savedSize);
    setSavedEqui({
      co2_g: savedSize * impactByMo.co2_g,
      cigarette: round(savedSize * impactByMo.cigarette),
      bottle: round(savedSize * impactByMo.bottle),
      car: round(savedSize * impactByMo.car),
    });
  };

  useEffect(() => {
    updateMail(user);
  }, [user]);

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
          <Graph data={parseDataGraph(parseDataMonthly(mails))}></Graph>
        </div>

        <div className={styles.center}>
          <div className={styles.logo}>
            <h2>{user ? "You" : "We"} have saved :</h2>
          </div>
          <div className={styles.thirteen}>{savedMo + "Mo"}</div>
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
              {round(savedEqui.co2_g / 1000)} <span>kg</span>
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
              {savedEqui.cigarette} <span>&#10799;</span>
              {`Cigarette${savedEqui.cigarette >= 2 ? "s" : ""}`}
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
              {savedEqui.bottle} <span>&#10799;</span>
              {`Bottle${savedEqui.bottle >= 2 ? "s" : ""}`}
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
              {savedEqui.car} <span>&#10799;</span>
              {`Km${savedEqui.car >= 2 ? "s" : ""} by car`}
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
