// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  requestLoans: {
    id: string;
    reg__borrower: string;
    reg__loanId: string;
    reg__collateralAmount: string;
    reg__borrowedAmount: string;
    reg__interest: string;
    reg__percentage: string;
    blockNumber: string;
    blockTimestamp: string;
    transactionHash: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>,
) {
  try {
    const response = await fetch('https://api.studio.thegraph.com/query/44880/lendtrust/version/latest', {
      method: 'POST', // Use POST for GraphQL queries
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          requestLoans(first: 10) {
            id
            reg__borrower
            reg__loanId
            reg__collateralAmount
            reg__borrowedAmount
            reg__interest
            reg__percentage
            blockNumber
            blockTimestamp
            transactionHash
          }
        }`,
        operationName: "Subgraphs",
        variables: {},
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const { data } = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
