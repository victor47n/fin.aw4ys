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
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
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

      <div className="relative h-full w-full">
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
