import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-screen w-screen flex flex-col gap-12 items-center justify-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
      {isError(error) && (
        <i>{error.statusText || error.message}</i>
      )}
      </p>
    </div>
  );
}

function isError(error: any): error is { statusText: string, message: string } {
    return error;
  }