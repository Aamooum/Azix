"use client";
import { useRouter } from "next/navigation";
import emptyImg from "@assets/emptyImg.png";
import { memo, useRef,useState,useEffect } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";

const Products = memo(({ products }) => {
  const router = useRouter();
  const isEffectRun = useRef(false)

  const [role,setRole] = useState("")

  const sessionData = async() => {

    const session = await getSession();
    
    if(session?.user?.role === undefined){
      setRole('Guest')
    }
    if (session?.user?.role === "user"){
      setRole('User')
    }
    if (session?.user?.role === "admin"){
      setRole('admin')
    }
  }
  useEffect(()=> {
    if(isEffectRun.current) return;
    sessionData()
    isEffectRun.current = true
  })
  return (
    <main>
      <div className="grid grid-cols-4 card-border max-480:grid-cols-1 min-481-max-834:grid-cols-2 min-835:grid-cols-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="card-border card min-835:"
            onClick={item._id.length === 24 && role != "admin" ? () => router.push(`/shop/${item._id}`) : null}
          >
           { item.images[0] !== "" ?
            <Image
              width={1000}
              height={1000}
              src={item.images[0] }
              alt={item.title }
              className="img-card w-full h-full object-cover"
              priority
            />
            :
            <Image
              width={1000}
              height={1000}
              src={emptyImg}
              alt={"Product image"}
              className="img-card w-full h-full object-cover"
              priority
            />
            }
            <div className="desc">
              <h3>{item.title}</h3>
              {item.price && `$ ${item.price}`}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
});

export default Products;
