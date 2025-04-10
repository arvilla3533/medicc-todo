import { redirect } from "next/navigation";

import { paths } from "@/config/paths";

export default function Page(): never {
  redirect(paths.app.todo);
}
