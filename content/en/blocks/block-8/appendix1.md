The Colb smart contracts prioritize security, user rights, and gas reduction from inception.

![Technical Architecture of TKSP Pools](/images/blocks/block-8/app1.png)
<p style="text-align: center; font-style: italic; margin-top: 8px;">Graphic: Technical Architecture of TKSP Pools</p>

## ColbPrivateOperator

● Acts as the central point within the Colb private pools subsystem.
● Solely authorized to access and manage private pools, including minting and burning $USC
tokens for deposits and withdrawals.
● Validates pool membership and manages pool deployment through the attached pool factory.

## PrivatePoolFactory

● Utilizes OpenZeppelin Clones for efficient pool deployment, minimizing gas costs.
● Manages pool requests, approvals, removals, and deployments, ensuring adherence to
predefined parameters set by the Colb admin.
● Parameters include minimum investment thresholds, early redemption penalties, and
minimum operational amounts.

## PrivatePool

● Represents a non-transferable ERC20 token owned exclusively by the pool creator.
● Requires a minimum investment upon deployment to cover setup and running costs.
● Handles deposit and withdrawal operations specific to each pool, involving the minting and
burning of Liquidity Provider tokens (LP tokens).

## Pool Lifecycle

● Initiates with the creation of pool requests, subject to user ownership of MembershipNFT and
whitelist inclusion.
● Requests are approved by the admin or removed by the request owner, with limits on pending
requests per user.
● Pool deployment is executed by the request owner, ensuring compliance with preset
parameters and user approvals.

## Withdraw Process

● Users request withdrawals meeting minimum amounts, subject to penalties if withdrawn
before maturity.
● Withdrawals are processed by the pool creator, with penalties applied based on investment
period and profit status.
● Off-chain requests are settled on-chain, with signed messages facilitating withdrawal
transactions.
● Colb charges a 0.5% fee, deducted off-chain, from the user's portfolio.

## Private Oracle

● Sources information from the open banking API and inputs it in the smart contracts.
● It works as a proprietary proof-of-reserves mechanism.