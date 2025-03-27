import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'
import React from 'react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
function Header() {
  return (
    <div className='m-auto p-3 border-b shadow-xl border-b-slate-500/50 '>
      <div className="flex justify-around items-center">
        <div className="flex justify-center items-center gap-3"> <Image src={"./frax-share-fxs-logo.svg"} width={35} height={35} alt='logo' />
          <p className="text-white text-xl font-medium ">SeCrypto</p></div>
        <div className="">
          <Select>
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="INR">INR</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <Button asChild>
          <Link href="/login">Login</Link>
        </Button></div>
      </div>

    </div>
  )
}

export default Header