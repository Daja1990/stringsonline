import React, { Suspense } from "react";

export default function Loader(props) {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export function SuspenseLoader(props) {
  return <Suspense fallback={<Loader {...props} />}>{props.children}</Suspense>;
}