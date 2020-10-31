var StellarSdk = require('stellar-sdk');
const fetch = require("node-fetch");

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const pair = StellarSdk.Keypair.random();

pair.secret();
pair.publicKey();

(async function main() {
    try {
        const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(
            pair.publicKey(),
        )}`,
        );
        const responseJSON = await response.json();
        console.log("SUCCESS! You have a new account :)\n", responseJSON);

    } catch (e) {
        console.error("ERROR!", e);
    }
    const account = await server.loadAccount(pair.publicKey());
    console.log("Balances for account: " + pair.publicKey());
    account.balances.forEach(function (balance) {
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);});
  })();


