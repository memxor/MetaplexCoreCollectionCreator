import { signerIdentity, createSignerFromKeypair, generateSigner } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fromWeb3JsKeypair } from "@metaplex-foundation/umi-web3js-adapters";
import { createCollection, fetchCollection } from "@metaplex-foundation/mpl-core";
import { Keypair } from "@solana/web3.js";
import fs from "fs";

const secret = JSON.parse(fs.readFileSync("./key.json"));
const kp = Keypair.fromSecretKey(Uint8Array.from(secret));

const umi = createUmi("https://api.devnet.solana.com/");
const signer = createSignerFromKeypair(umi, fromWeb3JsKeypair(kp));
umi.use(signerIdentity(signer));

const collectionAddress = generateSigner(umi);
await createCollection(umi, {
  name: "CC Weapons",
  uri: "https://linktr.ee/intotheverse",
  collection: collectionAddress,
}).sendAndConfirm(umi);

const collection = await fetchCollection(umi, collectionAddress.publicKey);
console.log(collection);