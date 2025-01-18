import Image from "next/image";
import { useAuth } from "../context/authContext";
import deleteTranslation from "../firebase/data/deleteTranslation";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  docId: string | undefined;
}

export default function DeleteButton({ docId }: DeleteButtonProps) {
  const router = useRouter();
  const userId = useAuth().userId;
  const handleDelete = () => {
    if (userId && docId) {
      deleteTranslation(userId, docId).then(() => {
        if (window.location.pathname === "/translations") {
          window.location.reload();
        } else {
          router.push("/translations");
        }
      });
    }
  };

  return (
    <button title="Delete"
      className="button z-[170] absolute top-0 left-0 m-2 p-2 bg-black/50 rounded-[15px]"
      onClick={handleDelete}
    >
      <Image
        src={"/delete-icon.svg"}
        alt="Delete"
        width={20}
        height={20}
        layout="intrinsic"
      />
    </button>
  );
}
