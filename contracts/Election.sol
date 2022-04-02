// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
/**
 * @title Election Contract
 * @author Ferdinand Attivi
 * @dev Mettre en œuvre le processus de vote ainsi que la délégation de vote pour le présidentiel 2022
 */
contract Election is ERC721URIStorage{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Electeur {
        uint256 weight; // weight pour calculer la délegation(nombre de votes)
        bool voted; // vrai si la personne a voté au premier tour
        bool votedSecond; // vrai si la personne a voté au second tour
        address delegate; // pour déleguer son vote à quelqu'un d'autre
        uint256 vote; // le vote de l'électeur au premier tour
        uint256 voteS; // le vote de l'électeur au second tour
    }

    struct Candidat {
        string name; // nom du candidat
        uint256 voteCount; // nombres de votes
        uint256 secondVoteCount; // second vote pour le candidat
        bool pass; // s'il passe au second tour
    }

    bool private finish; // pour voir si le premier tour est fini ou pas

    // evenements pour taf avec le front
    event Vote(address indexed voter, string candidate);
    event Delegation(address indexed voter, address indexed delegate);

    address public owner; // proprietaire

    uint256 public totalVotesPremier; // nombre total de votes au premier tour
    uint256 public totalVotesSecond; // nombre total de votes au second tour

    mapping(address => Electeur) public electeurs;

    Candidat[] public candidats; //liste des candidats
    address[] public votants; // liste des votants

    // vérification d'identité du proprio
    modifier onlyOwner() {
        require(msg.sender == owner, "Vous etes pas proprio");
        _;
    }

    /**
     * @dev Création du bulletin de vote .
     * @param candidatsName nom des candidats
     */
    constructor(string[] memory candidatsName) ERC721("Elections 2022", "election") {
        owner = msg.sender;
        electeurs[owner].weight = 1; // le proprio a egalement le droit de voter mdr

        for (uint256 i = 0; i < candidatsName.length; i++) {
            // Ajout des candidats à la liste des candidats
            candidats.push(
                Candidat({
                    name: candidatsName[i],
                    voteCount: 0,
                    secondVoteCount: 0,
                    pass: false
                })
            );
        }
    }

    /**
     * @dev MINT son nft (premier tour)
     */
     function mintPremierTour() private {
        uint256 newTokenId = _tokenIds.current(); // current token id
        //mint
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, "https://jsonkeeper.com/b/U6WF");
        _tokenIds.increment();
     }

    /**
     * @dev MINT son nft (second tour)
     */
     function mintSecondTour() private {
        uint256 newTokenId = _tokenIds.current(); // current token id
        //mint
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, "https://jsonkeeper.com/b/MFIL");
        _tokenIds.increment();
     }

    /**
     * @dev Donner à l'electeur le droit de vote
     * @param _electeur address du votant
     */
    function giveRightToVote(address _electeur) public onlyOwner {
        require(!electeurs[_electeur].voted, "il a deja vote");
        require(electeurs[_electeur].weight == 0);
        electeurs[_electeur].weight = 1;
        votants.push(_electeur);
    }

    /**
     * @dev Déléguer le vote à un autre électeur au premier tour
     * @param to addresse de l'électeur à qui le vote est délégué
     */
    function delegateFirst(address to) public {
        Electeur storage sender = electeurs[msg.sender];
        require(!finish, "le premier tour est finit");
        require(sender.weight != 0, "Vous n'avez pas le droit de voter");
        require(!sender.voted, "Already voted");
        require(
            to != msg.sender,
            "Vous ne pouvez pas deleguer votre vote a vous-meme"
        );
        while (electeurs[to].delegate != address(0)) {
            to = electeurs[to].delegate;
            // Si on a atteint la racine, on renvoie une erreur
            require(
                to != msg.sender,
                "Vous ne pouvez pas deleguer votre vote a vous-meme"
            );
        }
        sender.voted = true;
        sender.delegate = to;
        Electeur storage delegate_ = electeurs[to];
        if (delegate_.voted) {
            // Si la personne à qui le vote est délégué a déjà voté,
            //on ajoute le vote au candidat
            // correspondant
            totalVotesPremier++;
            candidats[delegate_.vote].voteCount += sender.weight;
        } else {
            // Sinon, on ajoute le vote au nombre de votes de celui à qui le vote est délégué
            // et comme ça il pourra voter aussi pour le délégateur
            delegate_.weight += sender.weight;
        }
        emit Delegation(msg.sender, to);
    }

    /**
     * @dev Déléguer le vote à un autre électeur au second tour
     * @param to addresse de l'électeur à qui le vote est délégué
     */
    function delegateSecond(address to) public {
        Electeur storage sender = electeurs[msg.sender];
        require(finish, "le premier tour not finish");
        require(sender.weight != 0, "Vous n'avez pas le droit de voter");
        require(!sender.votedSecond, "Already voted");
        require(
            to != msg.sender,
            "Vous ne pouvez pas deleguer votre vote a vous-meme"
        );

        while (electeurs[to].delegate != address(0)) {
            to = electeurs[to].delegate;

            // Si on a atteint la racine, on renvoie une erreur
            require(
                to != msg.sender,
                "Vous ne pouvez pas deleguer votre vote a vous-meme"
            );
        }
        sender.votedSecond = true;
        sender.delegate = to;
        Electeur storage delegate_ = electeurs[to];
        if (delegate_.votedSecond) {
            // Si le délégué a déjà voté, on ajoute le vote au candidat
            // correspondant
            candidats[delegate_.voteS].secondVoteCount += sender.weight;
            totalVotesSecond++;
        } else {
            // Sinon, on ajoute le vote au nombre de votes de celui à qui le vote est délégué
            // et comme ça il pourra voter aussi pour le délégateur
            delegate_.weight += sender.weight;
        }
        emit Delegation(msg.sender, to);
    }

    /**
     * @dev voter pour un candidat
     * @param _candidat index du candidat
     */
    function votePremierTour(uint256 _candidat) public {
        Electeur storage sender = electeurs[msg.sender];
        require(!finish, "le premier tour est finit");
        require(sender.weight != 0, "Vous n'avez pas le droit de voter");
        require(!sender.voted, "Already voted");
        sender.voted = true;
        sender.vote = _candidat;
        totalVotesPremier += sender.weight;
        mintPremierTour();
        // On ajoute le vote au candidat
        candidats[_candidat].voteCount += sender.weight;
        emit Vote(msg.sender, candidats[_candidat].name);
    }

    /**
     * @dev voter pour un candidat au second tour
     * @param _candidat index du candidat
     */
    function voteSecondTour(uint256 _candidat) public {
        Electeur storage sender = electeurs[msg.sender];
        require(finish, "le premier tour not finish");
        require(sender.weight != 0, "Vous n'avez pas le droit de voter");
        require(!sender.votedSecond, "Already voted");
        sender.votedSecond = true;
        sender.voteS = _candidat;
        totalVotesSecond += sender.weight;
        mintSecondTour();
        // On ajoute le vote au candidat
        candidats[_candidat].secondVoteCount += sender.weight;
        emit Vote(msg.sender, candidats[_candidat].name);
    }

    /**
     * @dev Afficher le résultat du vote
     * @return _winningProposal index du candidat gagnant
     */
    function winningProposalFirst()
        public
        view
        returns (uint256 _winningProposal)
    {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < candidats.length; p++) {
            if (candidats[p].voteCount > winningVoteCount) {
                winningVoteCount = candidats[p].voteCount;
                _winningProposal = p;
            }
        }
    }

    /**
     * @dev Afficher le résultat du second vote
     * @return _winningProposal index du candidat gagnant
     */
    function winningProposalSecond()
        public
        view
        returns (uint256 _winningProposal)
    {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < candidats.length; p++) {
            if (candidats[p].secondVoteCount > winningVoteCount) {
                winningVoteCount = candidats[p].secondVoteCount;
                _winningProposal = p;
            }
        }
    }

    /**
     * @dev Afficher le nom du candidat gagnant
     * @return _winnerName nom du candidat gagnant
     */
    function winnerFirstName() public view returns (string memory _winnerName) {
        _winnerName = candidats[winningProposalFirst()].name;
    }

    /**
     * @dev Afficher le nom du candidat gagnant
     * @return _winnerName nom du candidat gagnant
     */
    function winnerSecondName()
        public
        view
        returns (string memory _winnerName)
    {
        _winnerName = candidats[winningProposalSecond()].name;
    }

    /**
     * @dev les nombres de votes de tous les candidats
     * @return candidats
     */
    function getAllCandidats() public view returns (Candidat[] memory) {
        return candidats;
    }

    /**
     * @dev les votants
     * @return votants
     */
    function getAllVotants() public view returns (address[] memory) {
        return votants;
    }

    /**
     * @dev le nombre d'inscrit
     * @return votants.length
     */
     function getInscrits() public view returns(uint256){
         return votants.length;
     }

    /**
     * @dev mettre fin au vote pour le premier tour, remettre le poids de chaque electeur à 1
     */
    function endFirstVote() public onlyOwner {
        finish = true;
        for (uint256 i = 0; i < votants.length; i++) {
            electeurs[votants[i]].weight = 1;
        }
    }

    /**
     * @dev faire passer un candidat au second tour
     * @param _candidat index du candidat
     */
    function passSecondTour(uint256 _candidat) public onlyOwner {
        require(finish, "le premier tour not finish");
        candidats[_candidat].pass = true;
    }
}
