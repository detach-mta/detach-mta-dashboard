# detach-mta-dashboard

To show the disk space saved with the detach-mta solution, on a user or server level.

## Installation

```sh
git clone https://github.com/Naedri/detach-mta-board.git
cd detach-mta-board/
npm install
```

After creating an .env.local file from the .env.local.example file, you can launch the server with

```sh
npm run dev
```

Then you can open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Uses

- If you use [http://localhost:3000](http://localhost:3000), metrics of the overall server will be displayed.
- If you use [http://localhost:3000/?mail=contact@clebard.cloud](http://localhost:3000/?mail=contact@clebard.cloud), metrics for the following mail : `contact@clebard.cloud` will be displayed.

## Results

![Screenshot-Dashboard](./README.assets/Screenshot-Dashboard.png)

## References

Equivalent of CO2 are calculated upon the following references.

### WebSite

- [impactco2 - Converter](https://impactco2.fr/convertisseur)
- [impactco2 - Digital usage for a mail](https://impactco2.fr/usagenumerique/email)

### Data

| Manufacture, consume or browse | 1 kg of CO₂ represents | 1 Mo transfered and stored in a data center (≈ 4.136 g of CO₂) represents |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| Liters of bottled water        | 2.209                  | 0.009136424                                                               |
| Kilometers by car              | 4.596                  | 0.019009056                                                               |
| Cigarettes                     | 71.429                 | 0.295430344                                                               |
| Wooden tables                  | 0.013                  | 0.000053768                                                               |
