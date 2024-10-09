import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export interface DrawerProp {
  open: boolean;
  setOpen: (op: boolean) => void;
}

const LoanRequestDrawer = ({ open, setOpen }: DrawerProp) => {
  const [collateralAmount, setCollateralAmount] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [collateralToken, setCollateralToken] = React.useState("LINK");
  const [borrowedToken, setBorrowedToken] = React.useState("USDC");

  const handleConfirm = () => {
    console.log("Collateral Amount:", collateralAmount);
    console.log("Percentage:", percentage);
    console.log("Collateral Token:", collateralToken);
    console.log("Borrowed Token:", borrowedToken);
    // Add your confirm logic here (e.g., API call or form submission)
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {/* Trigger element if needed */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Request Loan</DrawerTitle>
            <DrawerDescription>Enter loan details below.</DrawerDescription>
          </DrawerHeader>
          
          {/* Start of Card */}
          <Card className="mt-4 shadow-lg">
            <CardHeader>
              <CardTitle>Loan Details</CardTitle>
              <CardDescription>Fill in the required details to request a loan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Input field for collateral amount */}
              <div>
                <label htmlFor="collateralAmount" className="block text-sm font-medium">
                  Collateral Amount
                </label>
                <Input
                  id="collateralAmount"
                  type="number"
                  placeholder="Enter collateral amount"
                  value={collateralAmount}
                  onChange={(e) => setCollateralAmount(e.target.value)}
                />
              </div>

              {/* Input field for percentage */}
              <div>
                <label htmlFor="percentage" className="block text-sm font-medium">
                  Percentage
                </label>
                <Input
                  id="percentage"
                  type="number"
                  placeholder="Enter percentage"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                />
              </div>

              {/* Select for collateral token */}
              <div>
                <label htmlFor="collateralToken" className="block text-sm font-medium">
                  Collateral Token
                </label>
                <Select value={collateralToken} onValueChange={setCollateralToken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LINK">LINK</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Select for borrowed token */}
              <div>
                <label htmlFor="borrowedToken" className="block text-sm font-medium">
                  Borrowed Token
                </label>
                <Select value={borrowedToken} onValueChange={setBorrowedToken}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </CardFooter>
          </Card>
          {/* End of Card */}

          <DrawerFooter>
            {/* Optional footer content */}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LoanRequestDrawer;
