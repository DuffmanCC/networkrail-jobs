"use client";

import useHeader from "@/app/hooks/useHeader";
import { Button, Card, Link, Switch } from "@nextui-org/react";
import Image from "next/image";

import {
  ApiIcon,
  FilterIcon,
  GitHubIcon,
  HomeIcon,
  MoonIcon,
  SunIcon,
} from "./Icons";

export default function Header() {
  const {
    isExplainLayer,
    handleToggleFilters,
    handleTooggleDarkMode,
    handleCloseExplainLayer,
  } = useHeader();

  return (
    <>
      <Card
        className="sm:col-span-2 bg-slate-200 dark:bg-slate-800"
        radius="sm"
        shadow="none"
      >
        <header>
          <div className="flex justify-between items-center py-2 px-2">
            <div className="flex gap-2">
              <Link href="/" aria-label="home" className="hover:scale-105">
                <HomeIcon className="w-6 h-6 text-gray-400" />
              </Link>

              <Link href="/api" aria-label="home" className="hover:scale-105">
                <ApiIcon className="w-6 h-6 text-gray-400" />
              </Link>

              <button
                onClick={handleToggleFilters}
                aria-label="filter toggle button"
                className="sm:hidden hover:scale-105"
              >
                <FilterIcon className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex gap-2">
              <Link
                href="https://github.com/DuffmanCC/networkrail-jobs"
                aria-label="https://github.com/DuffmanCC/networkrail-jobs"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-105"
              >
                <GitHubIcon className="w-6 h-6 text-gray-400" />
              </Link>

              <Switch
                aria-label="dark mode toggle"
                onValueChange={handleTooggleDarkMode}
                defaultSelected
                size="sm"
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <SunIcon className={className} />
                  ) : (
                    <MoonIcon className={className} />
                  )
                }
              />
            </div>
          </div>
        </header>
      </Card>

      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-50 text-white justify-center items-center ${
          isExplainLayer ? "flex" : "hidden"
        }`}
      >
        <Image
          src="/dark-mode.png"
          alt="arrow"
          className="absolute top-8 right-8"
          width="200"
          height="100"
        />

        <Image
          src="/filters.png"
          alt="arrow"
          className="absolute top-8 left-12"
          width="150"
          height="100"
        />

        <div className="flex flex-col gap-8 max-w-xs">
          <p>
            This is an alternative and version of{" "}
            <a
              href="https://www.networkrail.co.uk/careers/careers-search/"
              className="decoration-current underline"
              target="_blank"
              rel="noreferrer"
            >
              Networwork Rail
            </a>{" "}
            jobs
          </p>

          <Button
            className="text-white text-2xl"
            size="lg"
            variant="bordered"
            onClick={handleCloseExplainLayer}
          >
            Ok
          </Button>
        </div>
      </div>
    </>
  );
}
