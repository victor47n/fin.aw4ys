import Image from "next/image";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
      <div className="mx-auto flex h-full max-w-[550px] flex-col p-8 pt-0 sm:pt-8 lg:justify-center">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="fin.aw4ys"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem vindo!</h1>
        <p className="mb-8 text-muted-foreground">
          A fin.aw4ys é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <Image
              src="/google.svg"
              alt="Faça login"
              width={20}
              height={20}
              className="mr-2"
            />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>

      <div className="relative row-start-1 h-full w-full lg:col-start-2">
        <Image
          src="/login.webp"
          alt="Faça login"
          fill
          className="rounded-[4rem] object-cover p-8"
        />
      </div>
    </div>
  );
}
