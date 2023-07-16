import { Link, useRouteError } from "react-router-dom";
import { Button } from "./components/ui/button";
import { FC } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl mb-6">Oops!</h1>
        <p className="text-2xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-red-500 mb-4">
        {isRouterError(error) && (
          <i>{error.statusText || error.message}</i>
          )}
          {isAuthError(error) && (
            <i>{error.name}: {error.message}</i>
        )}
        </p>
        <Link to={"/"}>Back To Home</Link>
      </div>
    </div>
  );
}

export const ErrorElement = ({error}:{error:any}) => {
  console.error(error);

  return (
    <p className="text-red-500">
      {isRouterError(error) && (
        <i>{error.statusText || error.message}</i>
        )}
        {isAuthError(error) && (
          <i>{error.name}: {error.message}</i>
      )}
    </p>
  );
}

function isRouterError(error: any): error is { statusText: string, message: string } {
  return error;
}
function isAuthError(error: any): error is { name: string, message: string } {
    return error;
  }