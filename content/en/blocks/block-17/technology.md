$USC is issued on Polygon Network, with a design based on the widely-adopted ERC-20 token format. The decision was motivated by:

• Polygon’s compatibility with Ethereum through the use of a common language, Solidity

• The comparatively low cost of transactions

• The comparatively high speed of validations

• Polygon’s secure reputation in the Ethereum ecosystem

All mint, transfer and burn operations will be visible on the blockchain PolygonScan and every transaction will be traceable.

Operations have been designed so that they will be performed by different individuals, with specific roles. Initially, these roles will be handled internally by a member of the Colb team, who will sign any transaction with an individual key. For security purposes, some transactions may require multi-signature. The list of keys controlled by Colb employees will be made public, enabling users to validate the legitimacy of transactions at all times.  

The minting of $USC (i.e. converting USD to $USC) will be performed once USD has been successfully transferred to Colb Trust’s bank account. Only those members of Colb’s operations team with the designated role of ‘$USC_Minter’ will be allowed to perform the operation of minting.

The burning of $USC (i.e. converting $USC to USD), will be performed by sending an amount of $USC to a 'burning' contract. This contract will validate that a request has been made to cash $USC for USD by a user. Colb’s operations team will then burn $USC and transfer the money to the user. As with the minting process, only those with the designated role of ‘$USC_Burner’ will be allowed to perform this operation.

To ensure that users can always cash $USC and that nobody will be able to mint $USC without transferring the equivalent value in USD, a system has been put in place to ensure that the total amount of $USC in circulation (ERC 20 total supply) is always equal to (or lower than) the amount of USD and US Treasury Bills in Colb Trust’s bank account.

It is worth noting that Colb has adopted a non-custodial and decentralised approach, meaning that each user will have full control over their coins. It is impossible for any third party (including Colb and Colb Trust) to remove, freeze, transfer, destroy or perform any action on any user’s wallet balance. Therefore, any mishandling or loss incurred by the user is their sole responsibility and cannot be reversed by Colb or the Trust under any circumstances.

All code is open source, in line with our commitment to transparency and accountability.