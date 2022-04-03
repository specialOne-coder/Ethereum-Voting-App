import React, { useState, useEffect, createContext } from "react";
import { contractABI, contractAddress, infura } from "../utils/constants";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useLocation } from "react-router-dom";
const Alert = require("sweetalert2");

// Variables requises
export const ElectionContext = createContext(); // context ou sera englobé la logique de l'appli
const { ethereum } = window; // recuperer l'objet ethereum du navigateur

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: infura, // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "rinkeby", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  theme: "dark", // optional
});

/**
 *
 */
export const ElectionProvider = ({ children }) => {
  //-------------------------------------Mec ça va aller---------------------------------------------
  const [provider, setProvider] = useState();
  const [currentAccount, setCurrentAccount] = useState();
  const [candidat, setCandidat] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inscrits, setInscrits] = useState(0);
  const [voteP, setVoteP] = useState(0);
  const [candidatList, setCandidatList] = useState([]);
  const [voteS, setVoteS] = useState(0);
  const [error, setError] = useState("");
  const [goodNetwork, setGoodNetwork] = useState(false);

  const myProvider = async () => {
    const provider = await web3Modal.connect();
    setProvider(provider);
    return provider;
  };

  const myLibrary = async () => {
    const prov = await myProvider();
    const library = new ethers.providers.Web3Provider(prov);
    return library;
  };

  const mySigner = async () => {
    const lib = await myLibrary();
    const signer = lib.getSigner();
    return signer;
  };

  const myAccounts = async () => {
    const lib = await myLibrary();
    const accounts = lib.listAccounts();
    return accounts;
  };

  /**
   *
   * @returns le contrat pour permettre à l'utilisateur de faire des transacs
   */
  const getContract = async () => {
    const signer = await mySigner();
    const ElectionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return ElectionContract;
  };

  /**
   *
   * @returns le contrat pour recupérer des infos sans l'utilisateurs
   */
  const getContractWithoutSigner = async () => {
    const RPC = "https://rinkeby.infura.io/v3/2d40a4aee5274f3b80cad4f68e4d9d3a";
    const prov = new ethers.providers.JsonRpcProvider(RPC);
    const ElectionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      prov
    );
    return ElectionContract;
  };

  // connecter son wallet
  const connectWallet = async () => {
    //if (!ethereum) return alert("Svp veuillez installer un wallet ethereum");
    try {
      const library = await myLibrary();
      const accounts = await library.listAccounts();
      setCurrentAccount(accounts[0]);
    } catch (error) {
      setError(error);
    }
  };

  //voir s'il est connecté ou pas
  const isConnected = async () => {
    const acs = await myAccounts();
    if (acs.length > 0) {
      networkVerify();
      setCurrentAccount(acs[0]);
    }
  };

  // check network
  // verifier s'il est bien sur le bon réseau
  const networkVerify = async () => {
    const lib = await myLibrary();
    const net = lib.getNetwork();
    if ((await net).name !== "rinkeby") {
      Alert.fire({
        icon: "error",
        title: "Oops...",
        confirmButtonText: "Switcher vers le réseau rinkeby",
        text: "Mauvais, Veuillez utilisez le réseau rinkeby!",
      }).then((result) => {
        if (result.isConfirmed) {
          switchNetwork();
        }
      });
      setGoodNetwork(false);
    } else {
      setGoodNetwork(true);
    }
  };

  // Switcher vers le reseau rinkeby
  const switchNetwork = async () => {
    console.log("switch network start");
    const lib = await myLibrary();
    try {
      await lib.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(4).toString(16)}` }],
      });
      setGoodNetwork(true);
      console.log("switch network fin");
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      console.log("switch network error", switchError);
      if (switchError.code === 4902) {
        try {
          await lib.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${Number(4).toString(16)}`,
                chainName: "rinkeby",
                rpcUrls: ["https://rinkeby.infura.io/v3/"] /* ... */,
              },
            ],
          });
        } catch (addError) {
          console.log("error dajout", addError);
        }
      }
    }
  };

  const refreshState = () => {
    setCurrentAccount();
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  /**
   * Com avec le contrat
   */
  // vote au premier tour d'un utilisateur inscrit
  const premierVote = async (candidat) => {
    setLoading(true);
    setCandidat(candidat);
    let transaction;
    try {
      const contract = await getContract();
      let vote = await contract.votePremierTour(candidat, {
        gasLimit: 500000,
      });
      transaction = vote.hash;
      await vote.wait();
      setLoading(false);
      getCandidats();
      getNombreVotesPremierTour();
      Alert.fire({
        position: "center",
        icon: "success",
        title: `Vote confirmé `,
        text: `Vous venez de voter, vous avez aussi reçu votre nft, vous pouvez le retrouver dans votre portefeuille`,
        showConfirmButton: false,
        footer: `<a target="_blank" href='https://rinkeby.etherscan.io/tx/${transaction}'/>Voir la transaction</a>`,
      });
      contract.on("Vote", (address, candidatName) => {
        console.log("Vote: ", address, candidatName);
        getNombreVotesPremierTour();
      });
    } catch (error) {
      if (
        error.code === 4001 ||
        error.message.includes("User rejected the transaction")
      ) {
        setLoading(false);
        Alert.fire({
          icon: "error",
          title: "Oops...",
          text: "Permission denied",
          showConfirmButton: false,
        });
      } else {
        setLoading(false);
        Alert.fire({
          icon: "error",
          title: "Oops...",
          text: "Vous avez déja voté! Ou votre compte n'est pas inscrit",
          showConfirmButton: false,
          footer: `<a target="_blank" href='https://rinkeby.etherscan.io/tx/${transaction}' />Voir la transaction</a>`,
        });
      }
    }
  };

  // Nombres d'inscrits
  const getNombreInscrits = async () => {
    try {
      const contract = await getContractWithoutSigner();
      let inscrits = await contract.getInscrits();
      setInscrits(inscrits.toNumber() + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Nombres de votes au premier tour
  const getNombreVotesPremierTour = async () => {
    try {
      const contract = await getContractWithoutSigner();
      let votePrem = await contract.totalVotesPremier();
      setVoteP(votePrem.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  // Nombres de votes au deuxieme tour
  const getNombreVotesSecondTour = async () => {
    try {
      const contract = await getContractWithoutSigner();
      let voteSec = await contract.totalVotesSecond();
      setVoteS(voteSec.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  // Liste des candidats et leurs différentes infos
  const getCandidats = async () => {
    try {
      const contract = await getContractWithoutSigner();
      let candidats = await contract.getAllCandidats();
      const candidatData = candidats.map((candidat) => {
        return {
          id: candidat["1"].toNumber(),
          name: candidat["name"],
          votes: candidat["voteCount"].toNumber(),
          voteSecond: candidat["secondVoteCount"].toNumber(),
        };
      });
      setCandidatList(candidatData);
    } catch (error) {
      console.log(error);
    }
  };

  //A chaque fois qu'il y a event associés à ces variables, on récupère les infos
  useEffect(() => {
    getCandidats();
    getNombreVotesPremierTour();
    getNombreInscrits();
    getNombreVotesSecondTour();
  }, [voteP, voteS]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      isConnected();
    }
    const interval = setInterval(() => {
      getNombreInscrits();
      getNombreVotesPremierTour();
      getNombreVotesSecondTour();
      getCandidats();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setCurrentAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        if (_hexChainId != 4) {
          isConnected();
          Alert.fire({
            icon: "error",
            title: "Oops...",
            confirmButtonText: "Switcher vers le réseau rinkeby",
            text: "Mauvais réseau, Veuillez utilisez le réseau rinkeby!",
          }).then((result) => {
            if (result.isConfirmed) {
              switchNetwork();
            }
          });
          setGoodNetwork(false);
        } else {
          setGoodNetwork(true);
        }
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <ElectionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        premierVote,
        candidatList,
        loading,
        voteS,
        voteP,
        inscrits,
        goodNetwork,
        candidat,
        getNombreInscrits,
        getNombreVotesPremierTour,
        getNombreVotesSecondTour,
        getCandidats,
        networkVerify,
        switchNetwork,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
