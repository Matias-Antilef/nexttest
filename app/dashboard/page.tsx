"use client";

import useFetch from "@/hooks/useFetch";
import RepoCard from "@/components/repoCard/RepoCard";
import { useEffect, useState } from "react";
import Image from "next/image";

type UserData = {
  name: string | null;
  login: string;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  blog: string | null;
  public_repos: number;
};

type RepoData = {
  id: number;
  full_name: string;
  language: string | null;
  description: string | null;
  visibility: string;
  forks: number;
  stargazers_count: number;
};

function Dashboard() {
  const [randomId, setRandomId] = useState(
    Math.floor(Math.random() * 1000) + 1
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userRepos, setUserRepos] = useState<RepoData[] | null>(null);

  const changeId = () => {
    setRandomId(Math.floor(Math.random() * 2000) + 1);
  };

  const { data: user } = useFetch({
    url: `https://api.github.com/user/${randomId}`,
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
      setUserRepos(repos || []);
    }
  }, [user]);

  const { data: repos } = useFetch({
    url: `https://api.github.com/users/${userData?.login}/repos`,
  });

  useEffect(() => {
    if (repos) {
      setUserRepos(repos);
    }
  }, [repos]);

  return (
    <div className="mb10">
      <div className="flex flex-col items-center py-10 gap-6 ">
        <h1 className="text-3xl text-orange-500">Random user</h1>
        <button
          onClick={changeId}
          className="border-2 text-white border-white px-5 py-3 text-2xl rounded-lg"
        >
          Change User
        </button>
      </div>

      <div className=" flex max-xl:flex-col flex-row px-10 text-white gap-4 max-xl:gap-32 ">
        <div className="flex flex-col   w-[24rem] max-xl:w-full   sticky top-20 h-max max-xl:relative max-xl:flex-row">
          <section className="mb-2">
            {userData && (
              <Image
                alt={userData.login ?? "nose"}
                src={userData.avatar_url}
                className="rounded-full w-96 h-96 max-lg:w-52  max-lg:h-52"
                layout=""
                width={96}
                height={96}
              />
            )}
          </section>

          <section className=" max-xl:gap-5 max-xl:justify-center flex flex-col gap-10">
            <section className="mb-2 flex flex-col gap-1">
              {userData && (
                <h2 className="text-4xl">{userData.name ?? "No name"}</h2>
              )}
              {userData && (
                <h3 className="text-xl"> {userData.login ?? "No login"} </h3>
              )}
            </section>
            {userData && <p> {userData.bio ?? "No bio"} </p>}
            <section className="flex gap-2">
              {userData && <span>followers: {userData.followers ?? 0} </span>}
              {userData && <span>following: {userData.following ?? 0} </span>}
            </section>
            {userData && <h1> {userData.blog ?? "No url"} </h1>}
          </section>
        </div>

        <section className="flex-1">
          {userData && (
            <h1 className=" text-3xl  mb-5">
              Public repository count:
              <span className="text-orange-500"> {userData.public_repos}</span>
            </h1>
          )}
          <section className=" grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center ">
            {Array.isArray(userRepos) &&
              userRepos?.map((repos) => (
                <RepoCard
                  key={repos.id}
                  full_name={repos.full_name}
                  visibility={repos.visibility}
                  language={repos.language}
                  description={repos.description}
                  forks={repos.forks}
                  stargazers={repos.stargazers_count}
                />
              ))}
          </section>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
