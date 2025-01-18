import { bagelFatOne } from "../layout";
import Translations from "../components/Translations";

export default function TranslationsPage() {
  return (
    <div className="flex justify-center items-center translate-y-40 flex-col mx-5 mb-10 text-center">
      <h1 className={bagelFatOne.className + " text-5xl lg:text-7xl mb-5"}>
        Translations
      </h1>
      <Translations />
    </div>
  );
}
