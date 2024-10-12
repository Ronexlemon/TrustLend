import type { NextApiRequest, NextApiResponse } from "next";

export type LoanClaim = {
  id: string;
  _borrower: string;
  _loanId: string;
  _collateralAmount: string;
  _borrowedAmount: string;
  _interest: string;
  _percentage: string;
  blockNumber: string;
};

type Data = {
  lendLoans: LoanClaim[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { address } = req.body;

  try {
    const response = await fetch(
      'https://api.studio.thegraph.com/query/44880/trustlendv2/version/latest',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetLendLoans($lender: String!) {
             lendLoans(where: { _lender: $lender }) {
                id
                _borrower
                _lender
                _loanId
                blockNumber
                _borrowedAmount
                _collateralAmount
                _interest
                _percentage
              }
            }`,
          variables: {
            lender: address, // Dynamically pass the lender's address
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch loans");
    }

    const { data } = await response.json();

    if (!data.lendLoans || data.lendLoans.length === 0) {
      return res.status(404).json({ error: "No loan requests found" });
    }

    res.status(200).json({ lendLoans: data.lendLoans });
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
