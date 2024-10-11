import type { NextApiRequest, NextApiResponse } from "next";

export type LoanRequest = {
  id: string;
  reg__loanId: string;
  reg__isPaid: boolean;
  reg__isLend: boolean;
  reg__borrower: string;
  reg__interest: string;
  reg__percentage: string;
  reg__borrowedAmount: string;
  reg__collateralAmount: string;
  blockNumber: string;
};

type Data = {
  requestLoans: LoanRequest[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { borrower } = req.body;

  try {
    const response = await fetch(
      'https://api.studio.thegraph.com/query/44880/trustlendv2/version/latest',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query GetRequestLoans($borrower: String!) {
            requestLoans(where: { reg__borrower: $borrower }) {
              id
              reg__loanId
              reg__isPaid
              reg__isLend
              reg__borrower
              reg__interest
              reg__percentage
              reg__borrowedAmount
              reg__collateralAmount
              blockNumber
            }
          }`,
          variables: {
            borrower: borrower, // Pass borrower dynamically
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch loans");
    }

    const { data } = await response.json();

    if (!data.requestLoans || data.requestLoans.length === 0) {
      return res.status(404).json({ error: "No loan requests found" });
    }

    res.status(200).json({ requestLoans: data.requestLoans });
  } catch (error) {
    console.error("Error fetching loan requests:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
