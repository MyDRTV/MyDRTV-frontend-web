"use client";

import { useActionState, useState } from "react";
import {
  createMovie,
  type CreateMovieState,
} from "@/features/create_movie/services/createmovie";
import Button from "@/components/Button";

const inputClass =
  "w-full rounded-lg border border-gray-400 px-4 py-3 focus:border-gray-700 focus:outline-none";

export default function CreateMovie() {
  const [state, formAction, isPending] = useActionState<
    CreateMovieState,
    FormData
  >(createMovie, {});
  // Viser plakaten til venstre, mens man skriver URL'en
  const [posterUrl, setPosterUrl] = useState("");

  return (
    <form action={formAction} className="flex flex-row gap-12">
      {/*===================================================================
                          VENSTRE KOLONNE MED BILLEDE 
      ====================================================================*/}
      <div className="flex w-100 shrink-0 flex-col gap-6">
        <input
          type="url"
          name="poster_url"
          placeholder="Poster URL"
          required
          className={inputClass}
          onChange={(e) => setPosterUrl(e.target.value)}
        />
        {posterUrl ? (
          <img
            src={posterUrl}
            alt="Poster preview"
            className="w-100 rounded-lg border border-gray-400"
          />
        ) : (
          <div className="flex h-130 items-center justify-center rounded-lg border border-gray-400 bg-gray-100 opacity-60">
            Poster preview
          </div>
        )}
      </div>

      {/*===================================================================
                          HØJRE KOLONNE MED INPUTS 
      ====================================================================*/}
      <div className="flex flex-1 flex-col gap-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className={inputClass}
        />
        <div className="flex flex-row gap-6">
          <input
            type="number"
            name="release_year"
            placeholder="Release year"
            required
            className={inputClass}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            required
            className={inputClass}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          required
          rows={8}
          className={inputClass}
        />

        {/*===================================================================
                          VALIDATION FEJL OG SUCCESS BESKED 
        ====================================================================*/}
        {state.error && (
          <p role="alert" className="text-red-700">
            {state.error}
          </p>
        )}
        {state.success && (
          <p role="status" className="text-green-700">
            {state.success}
          </p>
        )}

        <div className="flex justify-center">
          <Button disabled={isPending}>
            {isPending ? "Creating movie..." : "Create movie"}
          </Button>
        </div>
      </div>
    </form>
  );
}
