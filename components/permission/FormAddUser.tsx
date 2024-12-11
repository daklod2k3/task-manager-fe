"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { lazy, useEffect, useState } from "react";
import { z } from "zod";

import { login, signup,CreateAcc } from "@/action/Auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "@radix-ui/react-icons";
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const FormField = function ({
  label,
  type,
  placeholder,
  name,
  error,
  register,
  valueAsNumber,
  showPassIcon,
}: any) {
  return (
    <>
      <Label>{label}</Label>
      <div className="flex flex-row-reverse items-center">
        <Input
          className="text-black"
          type={type}
          placeholder={placeholder}
          {...register(name, {
            valueAsNumber,
          })}
        />
        {showPassIcon}
      </div>
      {error && <span className="text-xs text-[#DD2C00]">{error.message}</span>}
    </>
  );
};

const RegisterSchema = z
  .object({
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    name: z.string().min(1, {
      message: "Tên không được trống",
    }),
    repassword: z.string(),
  })
  .refine((data) => data.password == data.repassword, {
    message: "Mật khẩu không trùng khớp",
    path: ["repassword"],
  });

const LoginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z.string().min(1, {
    message: "Thiếu mật khẩu",
  }),
});

export function FormAddUser({onClose,isLogin = true}:{onClose: () => void,isLogin:boolean}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
    mode: "all",
  });
  // ...
  // console.log(password);

  const router = useRouter();

  const [isShow, setIsShow] = useState(false);

  const { toast } = useToast();

  const [success, setSuccess] = useState(false);

  const EyeIcon = (
    <Eye
      className={"absolute mr-2 cursor-pointer"}
      size={20}
      onClick={() => setIsShow(true)}
    />
  );
  const EyeOffIcon = (
    <EyeOff
      className={"absolute mr-2 cursor-pointer"}
      size={20}
      onClick={() => setIsShow(false)}
    />
  );
  

  const [loading, setLoading] = useState(false);

  const showPassIcon = watch("password") ? (isShow ? EyeOffIcon : EyeIcon) : "";

  const formSubmit = async (data: any) => {
    setLoading(true);
    const result = await CreateAcc(data);
    onClose();
    if (!result) {
      return;
    }
    console.log(result);
    toast({
      title: "Login failed",
      description: result?.error || "An error occurred",
      variant: "destructive",
    });
    setSuccess(false);
    setLoading(false);
  };

  // if (success)
  //   return (
  //     <div className="">
  //       <Popover open={true}>
  //         <PopoverTrigger className="fixed left-1/2 top-1/2"></PopoverTrigger>
  //         <PopoverContent className="flex -translate-y-1/2 flex-col items-center shadow">
  //           <span className="text-lg font-bold">Đăng nhập thành công</span>
  //           <DotLottieReact src="/lottie/success.lottie" autoplay />
  //           <span>Đang chuyển hướng</span>
  //         </PopoverContent>
  //       </Popover>
  //     </div>
  //   );

  return (
    <Card className="flex items-center justify-center self-center rounded-md border-[1px] border-white bg-white px-10 py-5">
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="mx-auto grid w-[350px] gap-6"
        noValidate
      >
        <div className="grid gap-2 text-center">
          <p className="text-2xl font-bold text-primary">
            {"Tạo Tài Khoản"}
          </p>
        </div>
        <div className="grid gap-4">
          {isLogin ? (
            <>
              <div className="grid gap-2">
                <FormField
                  label="Email"
                  placeholder="Nhập email"
                  type="text"
                  name="email"
                  register={register}
                  error={errors.email}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  label={"Mật khẩu"}
                  placeholder={"Nhập mật khẩu"}
                  type={isShow ? "text" : "password"}
                  name={"password"}
                  register={register}
                  error={errors.password}
                  showPassIcon={showPassIcon}
                />
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-2">
                {/* <Label htmlFor="email">Họ Tên</Label>
                  <Input
                    type="text"
                    required
                    placeholder="Nhập họ tên của bạn"
                    {...register("name")}
                  /> */}
                <FormField
                  label={"Họ Tên"}
                  name={"name"}
                  type={"text"}
                  placeholder={"Nhập tên hiển thị với mọi người"}
                  register={register}
                  error={errors.name}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  label={"Email"}
                  name={"email"}
                  placeholder={"Nhập email"}
                  register={register}
                  error={errors.email}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  label={"Mật khẩu"}
                  type={isShow ? "text" : "password"}
                  name={"password"}
                  placeholder={"Nhập mật khẩu"}
                  register={register}
                  error={errors.password}
                  showPassIcon={showPassIcon}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  label={"Nhập lại mật khẩu"}
                  type={"password"}
                  name={"repassword"}
                  placeholder={"Nhập lại mật khẩu"}
                  register={register}
                  error={errors.repassword}
                />
              </div>
            </>
          )}
          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {"Tạo"}
            {loading && <Loader2 className="ml-2 animate-spin" size={16} />}
          </Button>
          {/* {isLogin ? (
            <Button variant="outline" className="w-full" type="button">
              <Image
                src="/image/logo-google.webp"
                className="mr-1"
                width={"24"}
                height={"24"}
                alt="google logo"
              />{" "}
              Login with Google
            </Button>
          ) : (
            ""
          )} */}
        </div>
        <div className="mt-4 text-center text-sm">
          {/* {isLogin ? (
            <>
              <span className="text-black">Không có tài khoản? </span>
              <Link href="/register" className="underline">
                Đăng ký
              </Link>
            </>
          ) : (
            <>
              <span className="text-black">Đã có tài khoản? </span>
              <Link href="/login" className="underline">
                Đăng nhập
              </Link>
            </>
          )} */}
        </div>
      </form>
    </Card>
  );
}
