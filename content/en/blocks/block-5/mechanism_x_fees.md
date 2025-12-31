Once a position in a TKSP is taken, the $USC is burnt, freeing up USD from the Legal Trust bank
account to be allocated to the real-world underlying asset. TKSPs mirror the performance of
underlying assets and offer users two methods to access liquidity, as shown below.

## Natural Liquidity

Users will naturally access liquidity once the maturity date of the TKSP is reached. Alternatively, users
can choose to redeem their TKSP early by exchanging it for $USC (or other whitelisted currencies),
subject to an early redemption penalty fee. Upon maturity or redemption, user positions are calculated
and they receive $USC, which can be reinvested or exchanged for fiat. Early withdrawals are calculated
based on the current portfolio balance compared to the balance at the time of settlement, with a
penalty fee applied. If the early redemption is unavailable, users can utilize the secondary market
mechanism. The TKSP price consistently aligns with the underlying price because the issuer trust fully
collateralized the token. In practice, the trust sells the underlying position on the market to generate
liquidity for token holders. This function is not available 24/7 because it is subject to the same
constraints as the banking system.

## Secondary Market Liquidity

Provides an alternative option when natural liquidity is unavailable, such as when the underlying asset
is illiquid. To tackle this problem, Colb leverages an intent-based infrastructure for secondary market
deals. It enables TKSP holders to tap into the capital of DeFi and CeFi rails. This creates incentives for
institutional investors to get access to discounted deals and fosters the liquidity bootstrapping of the
system. The secondary market operates on a best-effort basis and doesn't ensure alignment with the
underlying price. This is mainly due to price determination by supply and demand dynamics on the
token. This function is available 24/7 because it is handled either on-chain or off-chain through APIs.

In practice, for Colb Managed Tokens (CMTs), the primary acquisition works as follows:
1. User connects their non-custodial wallet to the Colb App
2. User wallet requests a pool creation
3. Colb’s Smart Contracts and Admin confirm the request and create the pool
4. The user wallet is now authorized to deploy $USC in the new pool
5. User subscribes to a tokenized investment by deploying $USC into the created pool
6. The TKSP is received while $USC is burnt, releasing USD at the $USC Issuer trust
7. $USC Issuer trust wires released USD to TKSP Issuer Trust
8. TKSP Issuer Trust uses USD to invest in the underlying real-world assets
9. TKSP starts tracking the performance and is visible in the Colb dashboard
10. Upon maturity, investments can be redeemed, crediting $USC to the user's wallet.

![CMT Creation Flow](/images/blocks/block-5/10.png)
<p style="text-align: center; font-style: italic; margin-top: 8px;">Graphic: CMT Creation Flow</p>

The TKSP is only released to the user once the issuer trust fully collateralizes it. The process of
acquiring the underlying asset can take days because it is subject to the same constraints as the
banking system. If the acquisition is not completed, the tokenization fails, and $USC is returned to be
claimed by the user.

The primary market acquisition will include a mechanism to control the price of the underlying asset,
ensuring that the user agrees to a certain slippage amount before confirming the subscription. If the
underlying prices fluctuate on the market due to extreme volatility, exceeding the agreed amount, the
tokenization process fails, and $USC is returned for the user to claim.

Depending on the investment product, there may be initial subscription, annual, and
performance-based charges. Furthermore, additional fees are applicable for early redemptions or
transactions on the secondary market. Detailed percentages for these fees are outlined in the terms
sheet of every TKSP to provide additional transparency and clarity.