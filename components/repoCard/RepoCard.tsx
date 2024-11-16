import { ForkIcon, StarIcon } from "@/app/assets/IconsSVG";

type Props = {
  full_name: string;
  language: string | null;
  description: string | null;
  visibility: string;
  forks: number;
  stargazers: number;
};

function RepoCard({
  full_name,
  language,
  description,
  visibility,
  forks,
  stargazers,
}: Props) {
  return (
    <div className=" border-[.5px] border-white p-4 flex flex-col rounded-lg gap-3 justify-around">
      <section className="flex gap-2 items-center flex-wrap ">
        <h3 className="font-bold text-xl text-blue-500">{full_name}</h3>
        <span className="text-sm text-yellow-300 border-2 border-yellow-300 p-2 rounded-lg ">
          {visibility}
        </span>
      </section>
      <p className="mt-2 text-sm text-slate-100 ">
        {description ?? "No info--"}
      </p>
      <section className="mt-2 flex items-center gap-5 ">
        <span className="text-sm">{language ?? "No lenguage main"}</span>
        <span className="text-slate-400 flex items-center gap-1">
          <ForkIcon /> {forks}
        </span>
        <span className="text-slate-400 flex items-center gap-1">
          <StarIcon /> {stargazers}
        </span>
      </section>
    </div>
  );
}
export default RepoCard;
