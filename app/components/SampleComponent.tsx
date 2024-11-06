"use client";
import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SampleComponentProps {
  hasOrangeText: boolean;
}

interface DogImage {
  message: string;
  status: string;
}

export const isValidEmail = (email: string) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const SampleComponent: React.FC<SampleComponentProps> = ({ hasOrangeText }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const clickHandler = () => {
    alert("Button Pressed");
  };

  const inputHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (isValidEmail(event.target.value)) {
      setEmail(event.target.value);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDogImage = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random", {
          signal: abortController.signal,
        });
        const data: DogImage = await response.json();
        setDogImage(data.message);
      } catch (error) {
        console.error("Error fetching dog image:", error);
      }
    };

    fetchDogImage();

    return () => {
      // Cancel the fetch request if component unmounts
      abortController.abort();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-2.5">
        <button
          className={`${hasOrangeText ? "text-orange-600" : "text-black"} rounded border-black bg-blue-100 px-4 py-2 transition-colors hover:bg-blue-300`}
          onClick={clickHandler}
        >
          Hello World
        </button>
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            name="name"
            className="max-w-96 rounded border border-black pl-2 focus-visible:outline-blue-300"
          />
        </label>
        <label className="flex flex-col">
          Email:
          <input
            ref={inputRef}
            type="email"
            name="email"
            onChange={inputHandler}
            className="max-w-96 rounded border border-black pl-2 focus-visible:outline-blue-300"
          />
        </label>
        <div>The most recent valid email is : {email}</div>
        <div>And here is a picture of a dog:</div>
        <div className={"flex h-[400px] flex-col items-center"}>
          {dogImage && <img className="h-full" src={dogImage} alt="Image of dog" />}
        </div>
        <Link className="underline" href="../samplePage">
          This is a sample route
        </Link>
      </div>
    </>
  );
};

export default SampleComponent;
