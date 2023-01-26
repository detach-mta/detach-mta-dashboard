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


const getData = function () {
  const colorDetach = "#02AFCF";
  const colorAttach = "#ef5104";
  
  const data = [
    { year: 2010, size: 10 },
    { year: 2011, size: 20 },
    { year: 2012, size: 15 },
    { year: 2013, size: 25 },
    { year: 2014, size: 22 },
    { year: 2015, size: 30 },
    { year: 2016, size: 28 },
  ];

  return {
    labels: data.map((row) => row.year),
    datasets: [
      {
        label: "Detattached",
        data: data.map((row) => row.size),
        backgroundColor: colorDetach,
      },
      {
        label: "Attached",
        data: data.map((row) => row.size * PERCENT_SAVE),
        backgroundColor: colorAttach,
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
        <link rel="stylesheet" href="style.css" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Don't tach my documents</h1>
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
          <Graph data={getData()}></Graph>
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
