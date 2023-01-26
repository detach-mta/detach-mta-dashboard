import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Graph from "@/component/Graph/Graph";

const inter = Inter({ subsets: ["latin"] });
const PERCENT_SAVE = 2.5;
const impact = {
  cigarettes: 10,
  bottle: 100,
  tree: 10,
  car: 100,
};

const data = [
  { year: 2010, size: 10 },
  { year: 2011, size: 20 },
  { year: 2012, size: 15 },
  { year: 2013, size: 25 },
  { year: 2014, size: 22 },
  { year: 2015, size: 30 },
  { year: 2016, size: 28 },
];

const getSavedSize = function (data: { year: number; size: number }[]) {
  return "35Mo";
};

const parseData = function (data: { year: number; size: number }[]) {
  const colorDetach = "#02AFCF";
  const colorAttach = "#000000";
  const borderWidth = 1.5;

  return {
    labels: data?.map((row: { year: number }) => row.year),
    datasets: [
      {
        label: "Attached",
        data: data?.map((row: { size: number }) => row.size * PERCENT_SAVE),
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
          <p>SMTP optimisé pour le partage de fichiers</p>
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
                height={100}
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
          <div className={styles.thirteen}>{getSavedSize(data)}</div>
        </div>

        <div className={styles.description}>
          <h2>which is equivalent to :</h2>
        </div>

        <div className={styles.grid}>
          <a
            href="https://www.camel.com"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {impact.cigarettes} <span>&#10799;</span>{" "}
              {`Cigarette${impact.cigarettes >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>100 cigarettes par octet.</p>
          </a>

          <a
            href="https://www.volvic.fr"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {impact.bottle} <span>&#10799;</span>{" "}
              {`Bouteille${impact.bottle >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>10 bouteilles par octet.</p>
          </a>
          <a
            href="https://www.car.com"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {impact.car} <span>&#10799;</span>{" "}
              {`Voiture${impact.car >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>100 voitures par octet.</p>
          </a>

          <a
            href="https://www.tree.fr"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {impact.tree} <span>&#10799;</span>{" "}
              {`Arbre${impact.tree >= 2 ? "s" : ""}`}
            </h2>
            <p className={inter.className}>10 arbres par octet.</p>
          </a>
        </div>
      </main>
    </>
  );
}
