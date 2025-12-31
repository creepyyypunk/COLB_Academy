Here, the user's aim is to barter their TKSP for another cryptocurrency. To do so, they must stake $COLB to create an intent and increase the incentive for a Solver to handle the matching process.

User: Barter-intent author

```plaintext
Balance: 1,000,000 TKSP = 1,000,000 USD / 10,000 $COLB

/ Open an intent by stake 100,000 COLB (x% of total intent value)

Intent input (parameters):

    /Bartering TKSP

    /Against type of crypto

    /Setting a minimum price

    /Specifying the time until the end of the offer

    /Defining the bounty in $COLB: 1% (low), 5% (moderate), 15% (fast)
```

Once the intent is published in the Intent Mempool, Solvers become aware of the Request for Solver
(RFS) and compete to construct a computational pathway that meets the intent parameters. Solvers
must deploy an executor contract. Upon approval, the Solver invokes the contract with the
specifications to execute the intent, allowing the contract to facilitate the on-chain transaction
according to the predefined parameters from both the intent and the Solver.

![Barter-intent Flow](/images/blocks/block-10/app3.png)
<p style="text-align: center; font-style: italic; margin-top: 8px;">Graphic: Barter-intent Flow</p>