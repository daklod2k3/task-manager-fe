// "use client";

// import { useState,useEffect } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ToastAction } from "@/components/ui/toast"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { usePermissionContext } from "@/context/permission-context"

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"

// const formDeptSchema = z.object({
//   id: z.number(),
//   name: z.string(),
//   path: z.string().min(1, "Department name is required"),
// });

// export default function FormEditResource({onClose,idResource,name,path}:{onClose: () => void,idResource: number,name:string,path:string}) {
//   const {toast,resourceFetch,updateReso} =  usePermissionContext();
//   type FormDeptType = z.infer<typeof formDeptSchema>;

//   const form = useForm<FormDeptType>({
//     resolver: zodResolver(formDeptSchema),
//     defaultValues: {
//       id: idResource,
//       name: name,
//       path: path,
//     },
//   });

//   const onSubmit = async (formData) => {
//     try {
//       const res = await updateReso(formData)
//       resourceFetch.mutate()
//       console.log(res);
//       onClose();
//       toast({
//         description: "successfully add department",
//       })
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "add department error",
//         description: String(error),
//         action: <ToastAction altText="Try again">Please Try again</ToastAction>,
//       })
//     }
//     form.reset()
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//       <FormField
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Resource Name</FormLabel>
//               <FormControl>
//               <Select
//                   onValueChange={(value) => {
//                     const updatedMembers = field.value || [];
//                     const newOwner = { user_id: value, owner_type: "owner" };
//                     filterOwner(newOwner.user_id)
//                     field.onChange([...updatedMembers.filter((m) => m.owner_type !== "owner"), newOwner]);
//                   }}
//                   value={field.value?.find((m) => m.owner_type === "owner")?.user_id || ""}
//                 >
//                   <SelectTrigger className="w-full h-[46px] min-h-[46px]">
//                     <SelectValue placeholder="Select an owner" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       <SelectLabel>Members</SelectLabel>
//                       {peoplesHasOwner.map((item) => (
                        
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
        
//         <div className="flex space-x-2">
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => {
//                 onClose();
//               }}
//               className="w-full"
//             >
//               Cancel
//             </Button>
//             <Button className="w-full" type="submit">Submit</Button>
//           </div>
//       </form>
//     </Form>
//   )
// }