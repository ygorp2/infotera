import { Calendar } from "~/components/ui/calendar";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin as MapPinIcon,
  Users as UsersIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { api } from "~/utils/api";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Footer from "~/components/app/footer";
import Nav from "~/components/app/nav";
import Title from "~/components/app/title";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

export const FormSchema = z.object({
  destiny: z.string({
    required_error: "É necesário escolher um destino",
  }),
  dateOfArrive: z.date({
    required_error: "Um dia de entrada é necessário",
  }),
  dateOfExit: z.date({
    required_error: "Um dia de saída é necessário",
  }),
  adults: z.coerce
    .number({
      required_error: "É necessário pelo menos 1 adulto",
    })
    .min(1)
    .default(1),
  childs: z.coerce
    .number()
    .positive({ message: "O número de crianças não pode ser negativo" })
    .default(0),
});

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { register } = form;
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full">
      <Nav />
      <div className="mt-44">
        <Title />
      </div>
      <div className="mx-28 mt-24 flex justify-center rounded-lg bg-white px-4 pb-2 pt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center justify-center"
          >
            <FormField
              control={form.control}
              name="destiny"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="flex">
                      <MapPinIcon
                        size={20}
                        className="mx-2 h-6 w-6 opacity-50"
                        color="hsl(210, 80%, 51%)"
                      />
                      <FormLabel className="text-base">Destino</FormLabel>
                    </div>
                    <FormControl className="mt-1">
                      <Input
                        className="mx-2 w-screen max-w-xl border-none text-base font-semibold text-secondary"
                        type="search"
                        {...field}
                        placeholder="Cidade de destino"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Separator orientation="vertical" className="mr-3" />
            <FormField
              control={form.control}
              name="dateOfArrive"
              render={({ field }) => (
                <FormItem className="flex w-64 flex-col">
                  <div className="flex flex-col">
                    <div className="flex">
                      <CalendarIcon
                        size={20}
                        className="mx-2 h-6 w-6 opacity-50"
                        color="hsl(210, 80%, 51%)"
                      />
                      <FormLabel className="text-base">Entrada</FormLabel>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="mt-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start border-none pl-3 text-left font-semibold",
                              !field.value && "text-base",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span className="font-bold text-secondary">
                                dd/mm/aaaa
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Separator orientation="vertical" className="mr-3" />
            <FormField
              control={form.control}
              name="dateOfExit"
              render={({ field }) => (
                <FormItem className="flex w-64 flex-col">
                  <div className="flex flex-col">
                    <div className="flex">
                      <CalendarIcon
                        size={20}
                        className="mx-2 h-6 w-6 opacity-50"
                        color="hsl(210, 80%, 51%)"
                      />
                      <FormLabel className="text-base font-semibold text-secondary">
                        Saída
                      </FormLabel>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="mt-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start border-none pl-3 text-left font-semibold",
                              !field.value && "text-base",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span className="font-bold text-secondary">
                                dd/mm/aaaa
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < form.getValues("dateOfArrive")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Separator orientation="vertical" className="mr-3" />
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="flex w-64 flex-col">
                  <div className="flex flex-col">
                    <div className="flex">
                      <UsersIcon
                        size={20}
                        className="mx-2 h-6 w-6 opacity-50"
                        color="hsl(210, 80%, 51%)"
                      />
                      <FormLabel className="text-base font-semibold text-secondary">
                        Hóspedes
                      </FormLabel>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl className="mt-1">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] justify-start border-none pl-3 text-left font-semibold",
                              !field.value && "text-base",
                            )}
                          >
                            {field.value || form.getValues("childs") ? (
                              <span className="">
                                {form.getValues("adults") || "1"} Adulto(s),{" "}
                                {form.getValues("childs") || "0"} Crianças
                              </span>
                            ) : (
                              <span className="font-bold text-secondary">
                                1 Adulto, 0 Crianças
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Label htmlFor="adults">Adultos</Label>
                        <div className="flex">
                          <Button
                            onClick={() =>
                              form.setValue(
                                "adults",
                                Number(form.getValues("adults") - 1),
                              )
                            }
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            {...register("adults")}
                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button
                            onClick={() =>
                              form.setValue(
                                "adults",
                                Number(form.getValues("adults") + 1),
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                        <Label htmlFor="childs">Crianças</Label>
                        <div className="flex">
                          <Button
                            onClick={() =>
                              form.setValue(
                                "childs",
                                Number(form.getValues("childs") - 1),
                              )
                            }
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            {...register("childs")}
                            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button
                            onClick={() =>
                              form.setValue(
                                "childs",
                                Number(form.getValues("childs") + 1),
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="ml-32"
              variant={"submit"}
              size={"lg"}
            >
              Pesquisar
            </Button>
          </form>
        </Form>
      </div>
      {/* <p className="text-2xl">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p> */}
      <Footer />
    </div>
  );
}
