import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function AvailibityLayout({ children }) {
  return (
    <div className=" mx-auto">
      <Suspense
        fallback={
          <div>
            <BarLoader width="100%" color="#36d7b7" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
