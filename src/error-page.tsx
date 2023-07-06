import { useRouteError } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl mb-6">Oops!</h1>
        <p className="text-2xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-red-500 mb-4">
        {isError(error) && (
          <i>{error.statusText || error.message}</i>
        )}
        </p>
        <a href="/"><Button>Back To Home</Button></a>
      </div>
    </div>
  );
}

function isError(error: any): error is { statusText: string, message: string } {
    return error;
  }