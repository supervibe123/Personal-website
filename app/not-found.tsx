import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/asset-path";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-lg text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">That page isn’t here.</h1>
        <Button asChild className="mt-8">
          <a href={assetPath("/")}>Return home</a>
        </Button>
      </div>
    </main>
  );
}
